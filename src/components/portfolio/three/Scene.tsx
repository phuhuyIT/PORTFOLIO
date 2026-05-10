import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Preload } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AuroraBackground } from './AuroraBackground';
import { HeroParticles } from './HeroParticles';

const ScrollCamera = () => {
  const { camera, scene } = useThree();
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      targetProgress.current = window.scrollY / Math.max(1, scrollHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, delta) => {
    // Lerp progress
    currentProgress.current += (targetProgress.current - currentProgress.current) * 0.05;

    // Camera keyframes per section (normalized 0–1 scroll progress)
    const cameraPath = [
      { progress: 0.00, pos: [0,  0,  5] }, // Hero
      { progress: 0.20, pos: [-2, 1,  3] }, // About
      { progress: 0.40, pos: [2, -1,  4] }, // Projects
      { progress: 0.60, pos: [0,  2,  3] }, // Experiments
      { progress: 0.80, pos: [-1, -2, 4] }, // Achievements
      { progress: 1.00, pos: [0,  0,  5] }, // Contact
    ];

    // Find current and next keyframe
    let curr = cameraPath[0];
    let next = cameraPath[cameraPath.length - 1];
    
    for (let i = 0; i < cameraPath.length - 1; i++) {
      if (currentProgress.current >= cameraPath[i].progress && currentProgress.current <= cameraPath[i+1].progress) {
        curr = cameraPath[i];
        next = cameraPath[i+1];
        break;
      }
    }

    let progressBetween = 0;
    if (next.progress > curr.progress) {
      progressBetween = (currentProgress.current - curr.progress) / (next.progress - curr.progress);
    }
    
    // Smoothstep for easier transition
    const easeProgress = progressBetween * progressBetween * (3 - 2 * progressBetween);

    const targetPos = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...curr.pos),
      new THREE.Vector3(...next.pos),
      easeProgress
    );

    camera.position.lerp(targetPos, 0.05);

    // Subtle drift
    const t = performance.now() / 1000;
    camera.position.x += Math.sin(t * 0.08) * 0.5;
    camera.position.y += Math.sin(t * 0.12) * 0.25;
    
    camera.lookAt(scene.position);
  });

  return null;
};

// Custom Star Field to replicate Deep Space Field
const DeepSpaceField = () => {
  return <Stars radius={50} depth={50} count={800} factor={4} saturation={0} fade speed={1} />;
};

export const AuroraScene = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <AuroraBackground />
        <HeroParticles />
        <ScrollCamera />
        <DeepSpaceField />
        <Preload all />
      </Canvas>
    </div>
  );
};
