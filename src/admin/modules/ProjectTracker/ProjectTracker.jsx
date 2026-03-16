import React, { useState } from 'react';
import KanbanBoard from './KanbanBoard';
import { useLocalStorage, KEYS, storage } from '../../../hooks/useLocalStorage';
import { useToast } from '../../../hooks/useToast';
import { useActivity } from '../../../hooks/useActivity';
import Drawer from '../../../components/Drawer';
import ProjectForm from '../PortfolioCMS/ProjectForm';

export default function ProjectTracker() {
  const [projects] = useLocalStorage(KEYS.PROJECTS, []);
  const { addToast } = useToast();
  const { logActivity } = useActivity();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preselectedStatus, setPreselectedStatus] = useState('CONCEPT');

  const handleUpdateStatus = (id, newStatus) => {
    const project = projects.find(p => p.id === id);
    const oldStatus = project.status;
    storage.update(KEYS.PROJECTS, id, { status: newStatus });
    
    addToast({ 
      type: 'success', 
      message: `// SYSTEM MIGRATION: "${project.title}" → ${newStatus}` 
    });
    
    logActivity('tracker', `Integrated "${project.title}" into ${newStatus}`);
  };

  const handleAddProject = (status) => {
    setPreselectedStatus(status);
    setIsDrawerOpen(true);
  };

  const handleSaveProject = (formData) => {
    storage.add(KEYS.PROJECTS, formData);
    addToast({ type: 'success', message: `// NEW SYSTEM "${formData.title}" INITIALIZED` });
    logActivity('tracker', `Initialized new system: ${formData.title}`);
    setIsDrawerOpen(false);
  };

  return (
    <div className="h-full">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-electric font-mono text-sm">//</span>
        <h2 className="font-orbitron text-xl text-primary tracking-[0.2em] font-black">
          LIFECYCLE KANBAN
        </h2>
        <div className="h-[1px] bg-subtle/30 flex-1 ml-4" />
        <div className="font-mono text-[10px] text-muted tracking-widest">
          TOTAL ASSETS: {projects.length}
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-8">
        <div className="min-w-[1200px]">
          <KanbanBoard 
            projects={projects} 
            onUpdateStatus={handleUpdateStatus} 
            onAddProject={handleAddProject}
          />
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="// INITIALIZE NEW SYSTEM"
      >
        <ProjectForm 
          project={{ status: preselectedStatus }} 
          onSubmit={handleSaveProject} 
          onCancel={() => setIsDrawerOpen(false)}
        />
      </Drawer>
    </div>
  );
}
