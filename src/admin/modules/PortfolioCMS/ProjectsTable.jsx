import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp, Star, ExternalLink } from 'lucide-react';
import Badge from '../../../components/Badge';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsTable({ projects, onEdit, onDelete, onToggleFeatured }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full overflow-hidden border border-subtle bg-panel">
      <table className="w-full text-left border-collapse">
        <thead className="bg-deep border-b border-subtle">
          <tr className="font-mono text-muted text-[10px] uppercase tracking-widest">
            <th className="px-6 py-4 font-medium">#</th>
            <th className="px-6 py-4 font-medium">TITLE</th>
            <th className="px-6 py-4 font-medium">CATEGORY</th>
            <th className="px-6 py-4 font-medium">STATUS</th>
            <th className="px-6 py-4 font-medium text-center">FEATURED</th>
            <th className="px-6 py-4 font-medium">UPDATED</th>
            <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-subtle/30">
          {projects.map((project, index) => (
            <React.Fragment key={project.id}>
              <tr className="hover:bg-hover/30 transition-colors group cursor-pointer" onClick={() => toggleExpand(project.id)}>
                <td className="px-6 py-4 font-mono text-electric text-xs">
                  {project.number || String(index + 1).padStart(3, '0')}
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                      <span className="font-mono text-primary font-semibold text-sm">
                        {project.title}
                      </span>
                      {expandedId === project.id ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
                   </div>
                </td>
                <td className="px-6 py-4">
                  <Badge type={project.category} />
                </td>
                <td className="px-6 py-4">
                  <Badge type={project.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleFeatured(project.id); }}
                    className={`transition-colors ${project.featured ? 'text-electric' : 'text-muted hover:text-electric/50'}`}
                  >
                    <Star size={18} fill={project.featured ? "currentColor" : "none"} />
                  </button>
                </td>
                <td className="px-6 py-4 font-mono text-muted text-[10px]">
                  {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onEdit(project)} className="text-electric hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(project.id)} className="text-fire hover:text-white transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
              
              <AnimatePresence>
                {expandedId === project.id && (
                  <tr>
                    <td colSpan="7" className="bg-void/50 px-8 py-6">
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-mono text-electric text-[10px] tracking-widest mb-2 uppercase">// HOOK</h4>
                            <p className="font-mono text-primary text-sm italic">"{project.hook}"</p>
                            
                            <h4 className="font-mono text-electric text-[10px] tracking-widest mt-6 mb-2 uppercase">// DESCRIPTION</h4>
                            <p className="font-mono text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                              {project.description}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-mono text-electric text-[10px] tracking-widest mb-2 uppercase">// TECH STACK</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.stack?.map(tech => (
                                <span key={tech} className="px-2 py-0.5 bg-panel border border-subtle font-mono text-[10px] text-electric uppercase">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {project.url && (
                              <div className="mt-6">
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-electric hover:underline font-mono text-xs">
                                  <ExternalLink size={14} /> LIVE DEMO
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
