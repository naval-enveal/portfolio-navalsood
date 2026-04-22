import { useState } from 'react';
import { Scene } from './components/3d/Scene';
import { Overlay } from './components/ui/Overlay';

function App() {
  const [activeNode, setActiveNode] = useState<any | null>(null);

  const handleNodeHover = (data: any | null) => {
    setActiveNode(data);
  };

  const handleNodeClick = (data: any) => {
    // In a real app, maybe navigate or open a detailed modal
    console.log("Clicked:", data);
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#0a0a0f] text-white">
      <Scene onNodeHover={handleNodeHover} onNodeClick={handleNodeClick} />
      <Overlay activeNode={activeNode} />
    </main>
  );
}

export default App;
