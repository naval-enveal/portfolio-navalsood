import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface ConnectionsProps {
  points: [number, number, number][][]; // Array of line segments (pairs of points)
}

export const Connections = ({ points }: ConnectionsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Data packets (pulses) travelling along the lines
  const pulses = useMemo(() => {
    return points.map((segment) => ({
      segment,
      progress: Math.random(), // Start at random positions
      speed: 0.002 + Math.random() * 0.005,
    }));
  }, [points]);

  const pulsesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (pulsesRef.current) {
      pulses.forEach((pulse, i) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0; // Loop back
        }

        const [start, end] = pulse.segment;
        const x = start[0] + (end[0] - start[0]) * pulse.progress;
        const y = start[1] + (end[1] - start[1]) * pulse.progress;
        const z = start[2] + (end[2] - start[2]) * pulse.progress;

        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        pulsesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      pulsesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base connection lines */}
      {points.map((segment, index) => (
        <Line
          key={index}
          points={segment}
          color="#2a2a3f"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}

      {/* Traveling data packets */}
      {points.length > 0 && (
        <instancedMesh ref={pulsesRef} args={[undefined, undefined, points.length]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </instancedMesh>
      )}
    </group>
  );
};
