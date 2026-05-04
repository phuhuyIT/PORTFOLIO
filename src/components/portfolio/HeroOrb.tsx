import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const NeuralOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = time * 0.1;
      ringsRef.current.rotation.x = time * 0.05;
    }
  });

  return (
    <group>
      {/* Central Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#00FFD1"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#00FFD1"
            emissiveIntensity={0.5}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Orbiting Rings */}
      <group ref={ringsRef}>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <torusGeometry args={[1.5 + i * 0.2, 0.01, 16, 100]} />
            <meshBasicMaterial color="#7B61FF" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>

      {/* Inner Glow */}
      <Sphere args={[0.8, 32, 32]}>
        <meshBasicMaterial color="#00FFD1" transparent opacity={0.1} />
      </Sphere>
    </group>
  );
};

export const HeroOrb = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00FFD1" />
        <NeuralOrb />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};
