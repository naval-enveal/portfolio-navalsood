import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface InteractiveNodeProps {
  position: [number, number, number];
  label?: string;
  color?: string;
  size?: number;
  data: any;
  onHover: (data: any | null) => void;
  onClick: (data: any) => void;
}

export const InteractiveNode = ({ 
  position, 
  label, 
  color = '#4fa8d1', 
  size = 1, 
  data, 
  onHover,
  onClick
}: InteractiveNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  // Independent drift
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime() + timeOffset;
      // Slight floating motion
      groupRef.current.position.y = position[1] + Math.sin(time) * 0.2;
      groupRef.current.position.x = position[0] + Math.cos(time * 0.8) * 0.2;
      groupRef.current.position.z = position[2] + Math.sin(time * 1.2) * 0.2;
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    onHover(data);
    
    // Scale up on hover
    if (meshRef.current && materialRef.current) {
      gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.4, ease: "power2.out" });
      gsap.to(materialRef.current, { emissiveIntensity: 2, duration: 0.4 });
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    onHover(null);
    
    // Scale down
    if (meshRef.current && materialRef.current) {
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(materialRef.current, { emissiveIntensity: 0.5, duration: 0.4 });
    }
  };

  return (
    <group ref={groupRef}>
      <mesh 
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          ref={materialRef}
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {label && (
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {label}
        </Text>
      )}
    </group>
  );
};
