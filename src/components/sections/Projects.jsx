import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['ALL', 'AGRICULTURE', 'AUTONOMOUS', 'DETECTION', 'DEFENCE', 'ASSISTIVE'];

  const filteredProjects = activeFilter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="bg-void py-[120px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="font-mono text-electric text-sm tracking-widest uppercase mb-4">
            // 04 — PROJECTS
          </p>
          <h2 className="font-orbitron font-bold text-primary text-[clamp(1.8rem,3vw,2.8rem)] leading-tight mb-8">
            Mission <span className="text-electric">Files.</span>
          </h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActiveFilter(filter)}
                aria-label={`Filter projects by ${filter}`}
                className={`px-6 py-2 font-rajdhani font-bold text-xs tracking-widest transition-all duration-300 border ${
                  activeFilter === filter
                    ? 'bg-electric text-void border-electric'
                    : 'bg-transparent text-muted border-electric/20 hover:border-electric/60 hover:text-text-secondary'
                }`}
              >
                {filter}
              </motion.button>

            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>

      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric/20 to-transparent" />
    </section>
  );
};

export default Projects;
