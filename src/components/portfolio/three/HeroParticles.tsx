import { useMemo, useRef, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollContext } from './Scene';
import { usePerformance } from '@/hooks/use-performance';

const PARTICLE_COUNT = 3000;

// Vertex shader for particles
const vertexShader = `
  uniform float uTime;
  varying float vDistance;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (15.0 / -mvPosition.z);
    vDistance = 1.0; 
  }
`;

// Fragment shader for glowing core particles
const fragmentShader = `
  uniform float uOpacity;
  varying float vDistance;

  void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float dist = dot(cxy, cxy);
    if (dist > 1.0) discard;

    float strength = 1.0 - dist;
    strength = pow(strength, 3.0);

    vec3 teal   = vec3(0.0, 1.0, 0.82);
    vec3 violet = vec3(0.48, 0.38, 1.0);
    vec3 color  = mix(violet, teal, strength);

    color += vec3(vDistance * 0.1);

    gl_FragColor = vec4(color, strength * 0.85 * uOpacity);
  }
`;

// Generate random sphere positions
function generateRandomCloud(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

// Generate rough human bust silhouette points
function sampleSilhouette(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const isHead = Math.random() > 0.6;
    if (isHead) {
      const r = 0.6 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 1.2;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.5;
    } else {
      const x = (Math.random() - 0.5) * 3;
      const y = Math.random() * -2 + 0.5;
      const yLimit = -Math.abs(x) * 0.5 + 0.5;
      const finalY = y < yLimit ? y : yLimit - Math.random();
      const z = (Math.random() - 0.5) * 0.8;
      positions[i * 3] = x;
      positions[i * 3 + 1] = finalY;
      positions[i * 3 + 2] = z;
    }
  }
  return positions;
}

export const HeroParticles = () => {
  const { config } = usePerformance();
  const scrollData = useContext(ScrollContext);
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const targetPositions = useMemo(() => sampleSilhouette(PARTICLE_COUNT), []);
  const speeds = useMemo(() => Array.from({ length: PARTICLE_COUNT }, () => 0.01 + Math.random() * 0.03), []);
  
  const initialPositions = useMemo(() => generateRandomCloud(PARTICLE_COUNT, 4), []);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOpacity: { value: 1.0 },
  }), []);

  useFrame((state) => {
    if (!pointsRef.current || !geometryRef.current || !geometryRef.current.attributes.position) return;
    
    // Performance: If scrolled past Hero/About, hide and stop calculations
    const progress = scrollData.current;
    const isVisible = progress < 0.35;
    
    if (pointsRef.current.visible !== isVisible) {
      pointsRef.current.visible = isVisible;
    }

    if (!isVisible) return;

    // Fade out as we leave hero
    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(1, 0, THREE.MathUtils.smoothstep(progress, 0.1, 0.3));
    }

    const posAttribute = geometryRef.current.attributes.position;
    const array = posAttribute.array as Float32Array;

    // Morph logic: respect quality level by only updating a subset of particles
    const activeCount = Math.min(PARTICLE_COUNT, config.particles);

    for (let i = 0; i < activeCount; i++) {
      const i3 = i * 3;
      array[i3]     += (targetPositions[i3]     - array[i3])     * speeds[i];
      array[i3 + 1] += (targetPositions[i3 + 1] - array[i3 + 1]) * speeds[i];
      array[i3 + 2] += (targetPositions[i3 + 2] - array[i3 + 2]) * speeds[i];
    }
    posAttribute.needsUpdate = true;

    // Set draw range to respect quality setting
    geometryRef.current.setDrawRange(0, activeCount);

    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
    pointsRef.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <points ref={pointsRef} position={[2, 0, 0]}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
