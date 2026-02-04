'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.pointer; // Mouse position usually -1 to 1
    
    // Rotate based on mouse
    const targetRotationX = -y * 0.5;
    const targetRotationY = x * 0.5;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} scale={2.2}>
        <MeshDistortMaterial
          color="#808080"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#444444" />
      
      <AnimatedShape />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="studio" />
    </Canvas>
  );
}
