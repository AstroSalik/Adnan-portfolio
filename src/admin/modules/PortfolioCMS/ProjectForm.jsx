import React, { useState, useEffect } from 'react';
import TagInput from '../../../components/TagInput';

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    hook: '',
    description: '',
    category: 'AGRICULTURE',
    status: 'CONCEPT',
    stack: [],
    featured: false,
    ...project
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleStackChange = (newStack) => {
    setFormData(prev => ({ ...prev, stack: newStack }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = '// required';
    if (!formData.hook) newErrors.hook = '// required';
    if (!formData.description) newErrors.description = '// required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const labelClass = "block font-mono text-electric text-[10px] tracking-widest uppercase mb-2";
  const inputClass = "w-full bg-input border border-subtle focus:border-electric outline-none py-3 px-4 font-mono text-primary text-sm transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      <div>
        <label className={labelClass}>
          Title * {errors.title && <span className="text-fire ml-2">{errors.title}</span>}
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`${inputClass} ${errors.title ? 'border-fire' : ''}`}
          placeholder="System Name..."
        />
      </div>

      <div>
        <label className={labelClass}>
          Hook * {errors.hook && <span className="text-fire ml-2">{errors.hook}</span>}
        </label>
        <input
          name="hook"
          value={formData.hook}
          onChange={handleChange}
          className={`${inputClass} ${errors.hook ? 'border-fire' : ''}`}
          placeholder="One-line elevator pitch..."
          maxLength={120}
        />
        <div className="text-right mt-1 font-mono text-[9px] text-muted">
          {formData.hook.length}/120
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="AGRICULTURE">AGRICULTURE</option>
            <option value="AUTONOMOUS">AUTONOMOUS</option>
            <option value="DETECTION">DETECTION</option>
            <option value="DEFENCE">DEFENCE</option>
            <option value="ASSISTIVE">ASSISTIVE</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="CONCEPT">CONCEPT</option>
            <option value="PROTOTYPE">PROTOTYPE</option>
            <option value="DEPLOYED">DEPLOYED</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Tech Stack</label>
        <TagInput 
          tags={formData.stack} 
          onChange={handleStackChange} 
          placeholder="// add technology..."
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
          rows={6}
          className={`${inputClass} ${errors.description ? 'border-fire' : ''} resize-none`}
          placeholder="Detailed breakdown of the project (Markdown supported)..."
        />
      </div>

      <div className="flex items-center gap-3 bg-deep p-4 border border-subtle">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="w-4 h-4 accent-electric"
        />
        <label htmlFor="featured" className="font-mono text-sm text-secondary cursor-pointer select-none">
          FEATURE ON PORTAL MAIN GRID
        </label>
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
          SAVE CHANGES
        </button>
      </div>
    </form>
  );
}
