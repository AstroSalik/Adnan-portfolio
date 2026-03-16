import { useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const ProjectCard = ({ project, onClick, index }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Category Color Map
  const categoryColors = {
    AGRICULTURE: '#22C55E',
    AUTONOMOUS: '#00D4FF',
    DEFENCE: '#E94560',
    DETECTION: '#F5A623',
    ASSISTIVE: '#A855F7',
  };

  const statusStyles = {
    DEPLOYED: "bg-green-500/20 text-green-400 border-green-500/40",
    PROTOTYPE: "bg-electric/20 text-electric border-electric/40",
    CONCEPT: "bg-fire/20 text-fire border-fire/40",
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,212,255,0.15)', borderColor: '#00D4FF' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`bg-panel border border-[#1E3A5F] relative flex flex-col group cursor-pointer transition-colors duration-200 overflow-hidden ${project.featured ? 'md:col-span-2 xl:col-span-2' : ''}`}
    >
      {/* Category Bar */}
      <div 
        className="h-1 w-full" 
        style={{ backgroundColor: categoryColors[project.category] || '#00D4FF' }} 
      />

      <div className="p-5 flex flex-col h-full" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] font-rajdhani font-bold px-2 py-0.5 border ${statusStyles[project.status]}`}>
            {project.status}
          </span>
          <span className="font-mono text-muted text-xs">
            // 00{project.id}
          </span>
        </div>

        <h3 className="font-orbitron font-bold text-primary text-lg mb-2 group-hover:text-electric transition-colors">
          {project.title}
        </h3>
        
        <p className="font-mono text-secondary italic text-sm mb-4 line-clamp-2">
          {project.hook}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.slice(0, 4).map((tech, i) => (
            <span key={i} className="font-rajdhani text-[10px] bg-void border border-subtle text-muted px-2 py-0.5">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-subtle flex justify-end">
          <span className="text-electric font-mono text-sm tracking-wider">
            OPEN FILE ↗
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
