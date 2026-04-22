import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface DownloadNodeProps {
  position: [number, number, number];
}

export const DownloadNode = ({ position }: DownloadNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Continuous pulsing and slight drift
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current && meshRef.current) {
      // Pulse emissive intensity
      materialRef.current.emissiveIntensity = 0.8 + Math.sin(time * 3) * 0.4;
      // Pulse scale slightly
      const scale = 0.8 + Math.sin(time * 3) * 0.05;
      meshRef.current.scale.set(
        hovered ? 1.2 : scale, 
        hovered ? 1.2 : scale, 
        hovered ? 1.2 : scale
      );
    }
    
    // Slight drift independent of the main hub rotation
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setHovered(true);
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    setHovered(false);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    // Programmatic download
    const link = document.createElement('a');
    link.href = '/Naval_Sood_CV.pdf';
    link.download = 'Naval_Sood_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#06b6d4" 
          emissive="#06b6d4"
          emissiveIntensity={1}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <Text
        position={[0, 1.5, 0]}
        fontSize={hovered ? 0.35 : 0.3}
        color={hovered ? "#00ffff" : "#aaaaaa"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={hovered ? 0.08 : 0.05}
        outlineColor="#000000"
      >
        {hovered ? "[ EXTRACT PAYLOAD ]" : "> GET /core_architecture/CV"}
      </Text>
    </group>
  );
};
