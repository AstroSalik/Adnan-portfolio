import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, ListFilter } from 'lucide-react';
import ProjectsTable from './ProjectsTable';
import ProjectForm from './ProjectForm';
import ProfileEditor from './ProfileEditor';
import { useLocalStorage, KEYS, storage } from '../../../hooks/useLocalStorage';
import { useToast } from '../../../hooks/useToast';
import { useActivity } from '../../../hooks/useActivity';
import Drawer from '../../../components/Drawer';
import ConfirmModal from '../../../components/ConfirmModal';

const TABS = ['PROJECTS', 'PROFILE'];

export default function PortfolioCMS() {
  const [activeTab, setActiveTab] = useState('PROJECTS');
  const [projects, setProjects] = useLocalStorage(KEYS.PROJECTS, []);
  const [profile, setProfile] = useLocalStorage(KEYS.PROFILE, {});
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  const [deleteId, setDeleteId] = useState(null);
  
  const { addToast } = useToast();
  const { logActivity } = useActivity();

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProject = (formData) => {
    if (editingProject) {
      storage.update(KEYS.PROJECTS, formData.id, formData);
      addToast({ type: 'success', message: `// PROJECT "${formData.title}" UPDATED` });
      logActivity('cms', `Updated project: ${formData.title}`);
    } else {
      storage.add(KEYS.PROJECTS, formData);
      addToast({ type: 'success', message: `// NEW PROJECT "${formData.title}" ADDED` });
      logActivity('cms', `Added new project: ${formData.title}`);
    }
    setIsDrawerOpen(false);
    setEditingProject(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const project = projects.find(p => p.id === deleteId);
    storage.delete(KEYS.PROJECTS, deleteId);
    addToast({ type: 'error', message: `// PROJECT "${project?.title}" DELETED` });
    logActivity('cms', `Deleted project: ${project?.title}`);
    setDeleteId(null);
  };

  const handleToggleFeatured = (id) => {
    const project = projects.find(p => p.id === id);
    storage.update(KEYS.PROJECTS, id, { featured: !project.featured });
    addToast({ type: 'info', message: `// FEATURED STATUS UPDATED FOR "${project.title}"` });
  };

  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    addToast({ type: 'success', message: '// PROFILE DATA SYNCHRONIZED' });
    logActivity('cms', 'Updated operator profile details');
  };

  return (
    <div className="space-y-8">
      {/* TAB BAR */}
      <div className="flex gap-8 border-b border-subtle">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 font-rajdhani font-bold text-sm tracking-[0.2em] transition-all relative ${
              activeTab === tab ? 'text-electric' : 'text-muted hover:text-secondary'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="cms-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'PROJECTS' ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="flex flex-col sm:flex-row flex-1 max-w-xl gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="// search projects matrix..."
                  className="w-full bg-input border border-subtle pl-12 pr-4 py-2 font-mono text-xs sm:text-sm text-primary focus:border-electric outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-input border border-subtle px-4 py-2 font-mono text-xs sm:text-sm text-secondary focus:border-electric outline-none appearance-none pr-10"
                >
                  <option value="ALL">ALL CATEGORIES</option>
                  <option value="AGRICULTURE">AGRICULTURE</option>
                  <option value="AUTONOMOUS">AUTONOMOUS</option>
                  <option value="DETECTION">DETECTION</option>
                  <option value="DEFENCE">DEFENCE</option>
                  <option value="ASSISTIVE">ASSISTIVE</option>
                </select>
                <ListFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={14} />
              </div>
            </div>
            
            <button
              onClick={() => { setEditingProject(null); setIsDrawerOpen(true); }}
              className="bg-electric text-void px-6 py-2 font-rajdhani font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus size={18} /> ADD PROJECT
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            <div className="min-w-[800px]">
              <ProjectsTable 
                projects={filteredProjects} 
                onEdit={(p) => { setEditingProject(p); setIsDrawerOpen(true); }}
                onDelete={setDeleteId}
                onToggleFeatured={handleToggleFeatured}
              />
            </div>
          </div>
        </div>
      ) : (
        <ProfileEditor profile={profile} onSave={handleSaveProfile} />
      )}

      {/* MODALS & DRAWERS */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingProject ? "// EDIT PROJECT" : "// NEW PROJECT"}
      >
        <ProjectForm 
          project={editingProject} 
          onSubmit={handleSaveProject} 
          onCancel={() => setIsDrawerOpen(false)}
        />
      </Drawer>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="DELETE PROJECT?"
        message="This action will permanently purge the project file from the system archives. This cannot be undone."
      />
    </div>
  );
}
