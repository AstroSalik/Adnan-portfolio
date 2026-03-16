import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import KanbanCard from './KanbanCard';

const COLUMN_COLORS = {
  'CONCEPT': 'text-muted border-muted',
  'IN PROGRESS': 'text-electric border-electric',
  'PROTOTYPE': 'text-gold border-gold',
  'DEPLOYED': 'text-success border-success'
};

const BADGE_COLORS = {
  'CONCEPT': 'bg-text-muted/10 text-text-muted border-text-muted/30',
  'IN PROGRESS': 'bg-electric/10 text-electric border-electric/30',
  'PROTOTYPE': 'bg-gold/10 text-gold border-gold/30',
  'DEPLOYED': 'bg-success/10 text-success border-success/30'
};

export default function KanbanColumn({ id, title, projects, onAdd }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-panel/40 border border-subtle flex flex-col min-h-[600px] w-full max-w-[320px]">
      <div className={`flex justify-between items-center p-4 border-b border-subtle/50 bg-deep/50`}>
        <h3 className={`font-orbitron text-xs font-black tracking-widest ${COLUMN_COLORS[title] || 'text-primary'}`}>
          {title}
        </h3>
        <span className={`font-mono text-[10px] px-2 py-0.5 border rounded-sm ${BADGE_COLORS[title]}`}>
          {projects.length}
        </span>
      </div>

      <div 
        ref={setNodeRef} 
        className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto no-scrollbar"
      >
        <SortableContext 
          items={projects.map(p => p.id)} 
          strategy={verticalListSortingStrategy}
        >
          {projects.map(project => (
            <KanbanCard key={project.id} project={project} />
          ))}
        </SortableContext>
        
        {projects.length === 0 && (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-subtle/20 rounded-md">
            <span className="font-mono text-[10px] text-muted tracking-widest opacity-30">// EMPTY</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onAdd(id)}
        className="p-3 bg-deep/30 border-t border-subtle flex items-center justify-center gap-2 font-mono text-[11px] text-muted hover:text-electric hover:bg-hover/30 transition-all opacity-70 group"
      >
        <Plus size={14} className="group-hover:scale-110 transition-transform" /> 
        ADD_SYSTEM
      </button>
    </div>
  );
}
