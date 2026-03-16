import React, { useState } from 'react';
import { Search, Plus, ListFilter, LayoutGrid, List } from 'lucide-react';
import RecognitionGrid from './RecognitionGrid';
import RecognitionForm from './RecognitionForm';
import { useLocalStorage, KEYS, storage } from '../../../hooks/useLocalStorage';
import { useToast } from '../../../hooks/useToast';
import { useActivity } from '../../../hooks/useActivity';
import Drawer from '../../../components/Drawer';
import ConfirmModal from '../../../components/ConfirmModal';

export default function RecognitionWall() {
  const [entries, setEntries] = useLocalStorage(KEYS.RECOGNITION, []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [deleteId, setDeleteId] = useState(null);

  const { addToast } = useToast();
  const { logActivity } = useActivity();

  const filteredEntries = entries.filter(e => {
    const matchesSearch = e.institution.toLowerCase().includes(search.toLowerCase()) || 
                         e.achievement.toLowerCase().includes(search.toLowerCase()) ||
                         e.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'ALL' || e.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleSave = (formData) => {
    if (editingEntry) {
      storage.update(KEYS.RECOGNITION, formData.id, formData);
      addToast({ type: 'success', message: `// RECOGNITION ENTRY UPDATED` });
    } else {
      storage.add(KEYS.RECOGNITION, formData);
      addToast({ type: 'success', message: `// NEW RECOGNITION RECORDED` });
      logActivity('recognition', `Recorded new achievement: ${formData.achievement}`);
    }
    setIsDrawerOpen(false);
    setEditingEntry(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const entry = entries.find(e => e.id === deleteId);
    storage.delete(KEYS.RECOGNITION, deleteId);
    addToast({ type: 'info', message: `// RECOGNITION RECORD PURGED` });
    logActivity('recognition', `Deleted recognition: ${entry?.achievement}`);
    setDeleteId(null);
  };

  return (
    <div className="space-y-8">
      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-4 max-w-3xl">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="// search recognition archives..."
              className="w-full bg-input border border-subtle pl-12 pr-4 py-2 font-mono text-xs sm:text-sm text-primary focus:border-electric outline-none transition-colors"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-input border border-subtle px-4 py-2 font-mono text-xs sm:text-sm text-secondary focus:border-electric outline-none"
          >
            <option value="ALL">ALL TYPES</option>
            <option value="AWARD">AWARD</option>
            <option value="PRESS">PRESS</option>
            <option value="FEATURE">FEATURE</option>
            <option value="COMMENDATION">COMMENDATION</option>
            <option value="COMPETITION">COMPETITION</option>
          </select>
        </div>
        
        <button
          onClick={() => { setEditingEntry(null); setIsDrawerOpen(true); }}
          className="bg-electric text-void px-6 py-2 font-rajdhani font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          <Plus size={18} /> RECORD AWARD
        </button>
      </div>

      <RecognitionGrid 
        entries={filteredEntries} 
        onEdit={(e) => { setEditingEntry(e); setIsDrawerOpen(true); }}
        onDelete={setDeleteId}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingEntry ? "// MODIFY RECOGNITION" : "// RECORD NEW RECOGNITION"}
      >
        <RecognitionForm 
          entry={editingEntry} 
          onSubmit={handleSave} 
          onCancel={() => setIsDrawerOpen(false)}
        />
      </Drawer>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="PURGE RECOGNITION RECORD?"
        message="This will remove the entry from both your admin archives and the public portfolio wall."
      />
    </div>
  );
}
