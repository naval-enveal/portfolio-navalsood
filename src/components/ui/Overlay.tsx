import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, Globe, ExternalLink, Award, Code2, Database, LayoutTemplate, Network, Download } from 'lucide-react';

interface OverlayProps {
  activeNode: any | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2, ease: 'easeIn' } }
};

export const Overlay = ({ activeNode }: OverlayProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex p-8 text-white">
      {/* Static Header */}
      <div className="absolute top-8 left-8 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">NAVAL.SOOD</span>
        </h1>
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mt-2">
          FULL-STACK Engineer // MERN + PYTHON
        </p>
      </div>

      <div className="absolute bottom-8 left-8 text-xs text-green-500/70 font-mono space-y-1">
        <p>System Uptime: 5+ Years Full-Stack Engineering</p>
        <p>Current Instance: Tech Lead @ DigiMantra</p>
        <p>Active Modules: React, Node.js, Docker, AI/LLM</p>
        <p className="animate-pulse pt-2 text-green-400/90">Interactive mode enabled. Select nodes to inspect payload...</p>
      </div>

      {/* Dynamic Overlay Box */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-8 top-1/2 -translate-y-1/2 w-96 p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md pointer-events-auto shadow-2xl shadow-cyan-900/20"
          >
            {activeNode.type === 'core' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-amber-500">{activeNode.title}</h2>
                <h3 className="text-lg text-gray-300 font-mono">{activeNode.subtitle}</h3>
                <div className="pt-4 border-t border-white/10 flex flex-col gap-2 text-sm text-gray-400">
                  <a href={`mailto:${activeNode.contact.email}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Mail size={16} /> {activeNode.contact.email}
                  </a>
                  <a href={activeNode.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Globe size={16} /> LinkedIn Profile <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}

            {activeNode.type === 'skill' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {activeNode.id === 'frontend' && <LayoutTemplate size={24} color={activeNode.color} />}
                  {activeNode.id === 'backend' && <Code2 size={24} color={activeNode.color} />}
                  {activeNode.id === 'database' && <Database size={24} color={activeNode.color} />}
                  {activeNode.id === 'devops' && <Network size={24} color={activeNode.color} />}
                  <h2 className="text-2xl font-bold" style={{ color: activeNode.color }}>{activeNode.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeNode.skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 text-xs font-mono rounded-full border" style={{ borderColor: `${activeNode.color}50`, backgroundColor: `${activeNode.color}10`, color: activeNode.color }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeNode.type === 'experience' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-pink-500">{activeNode.company}</h2>
                  <p className="text-sm font-mono text-gray-400 mt-1">{activeNode.period}</p>
                </div>
                <h3 className="text-lg text-white font-medium">{activeNode.role}</h3>

                {activeNode.details && <p className="text-sm text-gray-300 leading-relaxed">{activeNode.details}</p>}
                {activeNode.highlight && <p className="text-sm text-gray-300 leading-relaxed">{activeNode.highlight}</p>}
                {activeNode.project && (
                  <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-xs text-pink-400 font-mono mb-1">KEY PROJECT</p>
                    <p className="text-sm text-gray-300">{activeNode.project}</p>
                  </div>
                )}
                {activeNode.badge && (
                  <div className="flex items-start gap-2 mt-4 text-amber-400 text-sm bg-amber-400/10 p-2 rounded-lg border border-amber-400/20">
                    <Award size={18} className="shrink-0" />
                    <span>{activeNode.badge}</span>
                  </div>
                )}
              </div>
            )}

            {activeNode.category === 'constellation' && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">{activeNode.title}</h2>
                <h3 className="text-md text-cyan-400">{activeNode.institution}</h3>
                <p className="text-sm font-mono text-gray-500">{activeNode.period}</p>
                <div className="inline-block mt-2 px-2 py-1 text-xs uppercase tracking-wider rounded border border-gray-600 text-gray-400">
                  {activeNode.type}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2D CV Download Button */}
      <motion.a
        href="/Naval_Sood_CV.pdf"
        download="Naval_Sood_CV.pdf"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-8 right-8 pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/50 text-cyan-400 font-mono text-sm uppercase tracking-wider transition-all duration-300 glitch-hover hover:text-white"
      >
        <Download size={18} />
        Download CV
      </motion.a>
    </div>
  );
};
