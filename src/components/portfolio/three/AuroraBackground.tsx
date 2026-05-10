import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;

  varying vec2 vUv;

  // Classic 2D noise
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // smoothstep
    return mix(
      mix(noise(i), noise(i + vec2(1,0)), f.x),
      mix(noise(i + vec2(0,1)), noise(i + vec2(1,1)), f.x),
      f.y
    );
  }

  void main() {
    // We can use vUv directly for resolution independent
    vec2 uv = vUv;

    // Mouse influence — aurora drifts toward cursor
    vec2 mouse = uMouse * 0.3;

    // Multi-octave noise for organic flow
    float n  = smoothNoise(uv * 2.0 + uTime * 0.08 + mouse);
    float n2 = smoothNoise(uv * 4.0 - uTime * 0.05 + mouse * 1.2);
    float n3 = smoothNoise(uv * 1.0 + uTime * 0.03);

    float aurora = n * 0.5 + n2 * 0.3 + n3 * 0.2;

    // Color bands: void → teal → violet → ember
    vec3 void_col   = vec3(0.008, 0.016, 0.031);
    vec3 teal_col   = vec3(0.0,   1.0,   0.82);
    vec3 violet_col = vec3(0.48,  0.38,  1.0);
    vec3 ember_col  = vec3(1.0,   0.42,  0.21);

    vec3 color = void_col;
    color = mix(color, teal_col,   smoothstep(0.3, 0.6, aurora) * 0.12);
    color = mix(color, violet_col, smoothstep(0.5, 0.8, aurora) * 0.09);
    color = mix(color, ember_col,  smoothstep(0.7, 1.0, aurora) * 0.04);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const AuroraBackground = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [size.width, size.height]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Mouse is in normalized device coordinates (-1 to +1), map it to 0-1 or pass directly
      materialRef.current.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y);
    }
  });

  return (
    <mesh position={[0, 0, -20]} scale={[viewport.width * 10, viewport.height * 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};
