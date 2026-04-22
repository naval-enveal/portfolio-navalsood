import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { portfolioData } from '../../data/portfolio';
import { InteractiveNode } from './InteractiveNode';
import { Connections } from './Connections';
import { DownloadNode } from './DownloadNode';

interface NodeGraphProps {
  onNodeHover: (data: any | null) => void;
  onNodeClick: (data: any) => void;
}

export const NodeGraph = ({ onNodeHover, onNodeClick }: NodeGraphProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the entire nebula to simulate antigravity engine
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  // Calculate positions for inner orbit (Skills)
  const innerRadius = 5;
  const innerNodes = useMemo(() => {
    return portfolioData.innerOrbit.map((skill, index) => {
      const angle = (index / portfolioData.innerOrbit.length) * Math.PI * 2;
      return {
        ...skill,
        position: [
          Math.cos(angle) * innerRadius,
          (Math.random() - 0.5) * 2, // Slight vertical variation
          Math.sin(angle) * innerRadius,
        ] as [number, number, number],
      };
    });
  }, []);

  // Calculate positions for outer orbit (Experience)
  const outerRadius = 10;
  const outerNodes = useMemo(() => {
    return portfolioData.outerOrbit.map((exp, index) => {
      const angle = (index / portfolioData.outerOrbit.length) * Math.PI * 2 + Math.PI / 4;
      return {
        ...exp,
        position: [
          Math.cos(angle) * outerRadius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * outerRadius,
        ] as [number, number, number],
      };
    });
  }, []);

  // Constellations
  const constRadius = 14;
  const constNodes = useMemo(() => {
    return portfolioData.constellations.map((item, index) => {
      const angle = (index / portfolioData.constellations.length) * Math.PI * 2;
      return {
        ...item,
        position: [
          Math.cos(angle) * constRadius,
          (Math.random() - 0.5) * 8,
          Math.sin(angle) * constRadius,
        ] as [number, number, number],
      };
    });
  }, []);

  // Generate connection segments
  const connections = useMemo(() => {
    const segments: [number, number, number][][] = [];
    const corePos: [number, number, number] = [0, 0, 0];
    const downloadNodePos: [number, number, number] = [0, 4, 0];
    
    // Core to Download
    segments.push([corePos, downloadNodePos]);
    
    // Core to Inner
    innerNodes.forEach(node => segments.push([corePos, node.position]));
    
    // Inner to Outer
    innerNodes.forEach(inner => {
      outerNodes.forEach(outer => {
        // Connect if somewhat close to create a web
        if (Math.random() > 0.5) {
          segments.push([inner.position, outer.position]);
        }
      });
    });

    // Outer to Constellations
    outerNodes.forEach(outer => {
      constNodes.forEach(constNode => {
        if (Math.random() > 0.7) {
          segments.push([outer.position, constNode.position]);
        }
      });
    });

    return segments;
  }, [innerNodes, outerNodes, constNodes]);

  return (
    <group ref={groupRef}>
      {/* Core Hub */}
      <InteractiveNode
        position={[0, 0, 0]}
        label="Naval Sood"
        color="#ffaa00"
        size={1.5}
        data={{ type: 'core', ...portfolioData.coreHub }}
        onHover={onNodeHover}
        onClick={onNodeClick}
      />

      {/* CV Download Node */}
      <DownloadNode position={[0, 4, 0]} />

      {/* Inner Orbit (Skills) */}
      {innerNodes.map((node) => (
        <InteractiveNode
          key={node.id}
          position={node.position}
          label={node.title}
          color={node.color}
          size={1.2}
          data={{ type: 'skill', ...node }}
          onHover={onNodeHover}
          onClick={onNodeClick}
        />
      ))}

      {/* Outer Orbit (Experience) */}
      {outerNodes.map((node) => (
        <InteractiveNode
          key={node.id}
          position={node.position}
          label={node.company}
          color="#da4fa5"
          size={1}
          data={{ type: 'experience', ...node }}
          onHover={onNodeHover}
          onClick={onNodeClick}
        />
      ))}

      {/* Constellations (Education/Awards) */}
      {constNodes.map((node) => (
        <InteractiveNode
          key={node.id}
          position={node.position}
          label={node.title}
          color="#ffffff"
          size={0.8}
          data={{ category: 'constellation', ...node }}
          onHover={onNodeHover}
          onClick={onNodeClick}
        />
      ))}

      <Connections points={connections} />
    </group>
  );
};
