import React, { useState } from 'react';
import { Search, Plus, ListFilter, AlertTriangle } from 'lucide-react';
import OutreachTable from './OutreachTable';
import OutreachForm from './OutreachForm';
import { useLocalStorage, KEYS, storage } from '../../../hooks/useLocalStorage';
import { useToast } from '../../../hooks/useToast';
import { useActivity } from '../../../hooks/useActivity';
import Drawer from '../../../components/Drawer';
import ConfirmModal from '../../../components/ConfirmModal';
import { motion } from 'framer-motion';

export default function OutreachLog() {
  const [entries, setEntries] = useLocalStorage(KEYS.OUTREACH, []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [deleteId, setDeleteId] = useState(null);

  const { addToast } = useToast();
  const { logActivity } = useActivity();

  const filteredEntries = entries.filter(e => {
    const matchesSearch = e.organisation.toLowerCase().includes(search.toLowerCase()) || 
                         e.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || e.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const overdue = entries.filter(e => e.followUpDate && new Date(e.followUpDate) < new Date() && e.status !== 'CLOSED WON' && e.status !== 'CLOSED LOST');

  const handleSave = (formData) => {
    if (editingEntry) {
      storage.update(KEYS.OUTREACH, formData.id, formData);
      addToast({ type: 'success', message: `// ENTRY FOR "${formData.organisation}" UPDATED` });
      logActivity('outreach', `Updated outreach entry: ${formData.organisation}`);
    } else {
      storage.add(KEYS.OUTREACH, formData);
      addToast({ type: 'success', message: `// LOGGED NEW ENTRY: "${formData.organisation}"` });
      logActivity('outreach', `Logged new outreach: ${formData.organisation}`);
    }
    setIsDrawerOpen(false);
    setEditingEntry(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const entry = entries.find(e => e.id === deleteId);
    storage.delete(KEYS.OUTREACH, deleteId);
    addToast({ type: 'error', message: `// ENTRY DELETED: "${entry?.organisation}"` });
    logActivity('outreach', `Deleted outreach: ${entry?.organisation}`);
    setDeleteId(null);
  };

  return (
    <div className="space-y-8">
      {/* OVERDUE ALERT */}
      {overdue.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gold/10 border border-gold p-4 flex items-center gap-4"
        >
          <AlertTriangle className="text-gold" size={20} />
          <div className="font-mono text-gold text-sm tracking-wide">
            // CRITICAL: {overdue.length} follow-ups are overdue. Immediate action suggested.
          </div>
        </motion.div>
      )}

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-4 max-w-3xl">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="// search organisation matrix..."
              className="w-full bg-input border border-subtle pl-12 pr-4 py-2 font-mono text-xs sm:text-sm text-primary focus:border-electric outline-none transition-colors"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-input border border-subtle px-4 py-2 font-mono text-xs sm:text-sm text-secondary focus:border-electric outline-none"
          >
            <option value="ALL">ALL TYPES</option>
            <option value="RESEARCH">RESEARCH</option>
            <option value="SPEAKING">SPEAKING</option>
            <option value="APPLICATION">APPLICATION</option>
            <option value="PARTNERSHIP">PARTNERSHIP</option>
            <option value="MEDIA">MEDIA</option>
            <option value="OTHER">OTHER</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-input border border-subtle px-4 py-2 font-mono text-xs sm:text-sm text-secondary focus:border-electric outline-none"
          >
            <option value="ALL">ALL STATUS</option>
            <option value="DRAFT">DRAFT</option>
            <option value="SENT">SENT</option>
            <option value="REPLIED">REPLIED</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="CLOSED WON">CLOSED WON</option>
            <option value="CLOSED LOST">CLOSED LOST</option>
          </select>
        </div>
        
        <button
          onClick={() => { setEditingEntry(null); setIsDrawerOpen(true); }}
          className="bg-electric text-void px-6 py-2 font-rajdhani font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          <Plus size={18} /> LOG OUTREACH
        </button>
      </div>

      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
        <div className="min-w-[900px]">
          <OutreachTable 
            entries={filteredEntries} 
            onEdit={(e) => { setEditingEntry(e); setIsDrawerOpen(true); }}
            onDelete={setDeleteId}
          />
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingEntry ? "// EDIT OUTREACH" : "// NEW OUTREACH ENTRY"}
      >
        <OutreachForm 
          entry={editingEntry} 
          onSubmit={handleSave} 
          onCancel={() => setIsDrawerOpen(false)}
        />
      </Drawer>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="DELETE ENTRY?"
        message="Purging this record from the outreach log. Data recovery will not be possible."
      />
    </div>
  );
}
