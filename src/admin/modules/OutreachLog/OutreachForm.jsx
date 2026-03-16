import React, { useState } from 'react';

const TYPES = ['RESEARCH', 'SPEAKING', 'APPLICATION', 'PARTNERSHIP', 'MEDIA', 'OTHER'];
const STATUSES = ['DRAFT', 'SENT', 'REPLIED', 'IN PROGRESS', 'CLOSED WON', 'CLOSED LOST'];

export default function OutreachForm({ entry, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'RESEARCH',
    organisation: '',
    description: '',
    status: 'DRAFT',
    notes: '',
    followUpDate: '',
    ...entry
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.organisation) newErrors.organisation = '// required';
    if (!formData.description) newErrors.description = '// required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  const labelClass = "block font-mono text-electric text-[10px] tracking-widest uppercase mb-2";
  const inputClass = "w-full bg-input border border-subtle focus:border-electric outline-none py-3 px-4 font-mono text-primary text-sm transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClass}
          >
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Organisation / Contact * {errors.organisation && <span className="text-fire ml-2">{errors.organisation}</span>}
        </label>
        <input
          name="organisation"
          value={formData.organisation}
          onChange={handleChange}
          className={`${inputClass} ${errors.organisation ? 'border-fire' : ''}`}
          placeholder="e.g. IIT Delhi Research Lab"
        />
      </div>

      <div>
        <label className={labelClass}>
          Description * {errors.description && <span className="text-fire ml-2">{errors.description}</span>}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`${inputClass} ${errors.description ? 'border-fire' : ''} resize-none`}
          placeholder="Brief summary of the opportunity..."
        />
      </div>

      <div>
        <label className={labelClass}>Status *</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={inputClass}
        >
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass}>Follow-up Date</label>
        <input
          type="date"
          name="followUpDate"
          value={formData.followUpDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Internal Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={2}
          className={`${inputClass} resize-none`}
          placeholder="Private context or next steps..."
        />
      </div>

      <div className="fixed bottom-0 right-0 w-full max-w-[480px] bg-deep border-t border-subtle px-6 py-4 flex gap-3 justify-end z-10">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-subtle text-muted hover:text-primary font-rajdhani font-bold transition-colors"
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-electric text-void font-rajdhani font-bold hover:opacity-90 transition-opacity"
        >
          LOG ENTRY
        </button>
      </div>
    </form>
  );
}
