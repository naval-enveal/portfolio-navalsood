import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { NodeGraph } from './NodeGraph';
import { DustParticles } from './DustParticles';

interface SceneProps {
  onNodeHover: (data: any | null) => void;
  onNodeClick: (data: any) => void;
}

export const Scene = ({ onNodeHover, onNodeClick }: SceneProps) => {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-[#0a0a0f]">
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
        {/* Environment */}
        <color attach="background" args={['#0a0a0f']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <DustParticles count={1500} />

        {/* Core Node Structure */}
        <NodeGraph onNodeHover={onNodeHover} onNodeClick={onNodeClick} />

        {/* Camera Controls */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={10} 
          maxDistance={40}
          autoRotate={false}
        />

        {/* Post Processing for Cyberpunk Glow */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
