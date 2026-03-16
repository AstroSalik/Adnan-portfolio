import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-void/95 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full bg-panel border border-subtle shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Fixed Close Button - High Z-Index & Distinct Contrast */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-void/80 border border-electric/30 text-electric hover:bg-electric hover:text-void transition-all duration-300 rounded-sm"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>

          {/* Scrollable Content Container */}
          <div className="overflow-y-auto p-8 pt-12 md:pt-8 custom-scrollbar">
            <div className="mb-6">
              <span className="font-mono text-electric text-sm tracking-widest uppercase mb-2 block">
                // PROJECT FILE: MISSION 00{project.id}
              </span>
              <h2 className="font-orbitron font-black text-primary text-3xl mb-2">
                {project.title}
              </h2>
              <div className="h-1 w-20 bg-electric mb-6" />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-rajdhani text-muted font-bold text-xs uppercase tracking-widest mb-2">Technical Overview</h4>
                <p className="font-mono text-secondary leading-relaxed text-[0.95rem]">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="font-rajdhani text-muted font-bold text-xs uppercase tracking-widest mb-3">Tech Stack Deep-Dive</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="bg-void border border-subtle font-mono text-electric text-xs px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-electric/5 border border-electric/20 p-4">
                <h4 className="font-rajdhani text-electric font-bold text-xs uppercase tracking-widest mb-1">Impact & Outcome</h4>
                <p className="font-mono text-secondary text-sm italic">
                  {project.status === 'DEPLOYED' 
                    ? "Successfully deployed and operational in field environments." 
                    : project.status === 'PROTOTYPE' 
                      ? "Currently in functional prototype stage with active testing." 
                      : "Development concept with validated technical feasibility."}
                </p>
              </div>

              {project.technicalInsight && (
                <div className="mt-8 pt-8 border-t border-subtle">
                  <h4 className="font-rajdhani text-muted font-bold text-xs uppercase tracking-widest mb-4">Technical Deep-Dive</h4>
                  {project.technicalImage && (
                    <div className="relative mb-6 group">
                      <div className="absolute -inset-1 bg-electric/20 blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <div className="relative bg-panel border border-subtle overflow-hidden">
                        <img 
                          src={project.technicalImage} 
                          alt="Technical Insight" 
                          className="w-full h-auto object-cover border border-electric/20"
                        />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-panel/60 to-transparent" />
                      </div>
                    </div>
                  )}
                  <p className="font-mono text-secondary leading-relaxed text-sm bg-void/50 p-4 border-l-2 border-electric">
                    {project.technicalInsight}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
