import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Clock } from 'lucide-react';
import Badge from '../../../components/Badge';

export default function KanbanCard({ project }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.8 : 1,
    rotate: isDragging ? '1.5deg' : '0deg',
    boxShadow: isDragging ? '0 20px 40px rgba(0,212,255,0.25)' : 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-hover/40 border border-subtle p-4 cursor-grab active:cursor-grabbing hover:border-electric/50 transition-colors`}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge type={project.category} />
        <span className="font-mono text-muted text-[10px] tracking-widest">
          #{project.number || '---'}
        </span>
      </div>

      <h4 className="font-orbitron text-xs font-bold text-primary mb-3 leading-tight uppercase">
        {project.title}
      </h4>

      <div className="flex flex-wrap gap-1 mb-4">
        {project.stack?.slice(0, 2).map(tech => (
          <span key={tech} className="font-mono text-[9px] text-muted bg-panel border border-subtle px-1.5 py-0.5">
            {tech.toUpperCase()}
          </span>
        ))}
        {project.stack?.length > 2 && (
          <span className="font-mono text-[9px] text-muted bg-panel border border-subtle px-1.5 py-0.5">
            +{project.stack.length - 2}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-subtle/30">
        <div className="flex items-center gap-1.5 font-mono text-muted text-[9px]">
          <Clock size={10} />
          {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}
        </div>
        <div {...attributes} {...listeners} className="text-muted hover:text-electric transition-colors">
          <GripVertical size={14} />
        </div>
      </div>
    </div>
  );
}
