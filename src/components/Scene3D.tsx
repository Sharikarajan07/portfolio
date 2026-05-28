"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Environment, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function AnimatedBackground() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1.5} />
      
      {/* Holographic glowing spheres with tech rings */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[4, 2, -10]}>
        <group>
          <Sphere args={[1.5, 64, 64]}>
            <MeshDistortMaterial
              color="#a855f7"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              emissive="#a855f7"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </Sphere>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <torusGeometry args={[3, 0.01, 16, 100]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.5} wireframe />
          </mesh>
        </group>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={2.5} position={[-5, -1, -15]}>
        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#22d3ee"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            emissive="#22d3ee"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={3} floatIntensity={1} position={[0, -5, -8]}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#38bdf8"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.3}
            metalness={0.7}
            emissive="#38bdf8"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={2} />
      <pointLight position={[10, -10, -10]} color="#22d3ee" intensity={2} />
      
      <Suspense fallback={null}>
        <AnimatedBackground />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
