import React, { useState } from 'react';

const TYPES = ['AWARD', 'PRESS', 'FEATURE', 'COMMENDATION', 'COMPETITION'];

export default function RecognitionForm({ entry, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: 'AWARD',
    institution: '',
    achievement: '',
    date: new Date().getFullYear().toString(),
    description: '',
    url: '',
    image: null,
    showOnPortfolio: true,
    ...entry
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.institution) newErrors.institution = '// required';
    if (!formData.achievement) newErrors.achievement = '// required';
    if (!formData.date) newErrors.date = '// required';
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

      <div>
        <label className={labelClass}>
          Institution / Source * {errors.institution && <span className="text-fire ml-2">{errors.institution}</span>}
        </label>
        <input
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          className={`${inputClass} ${errors.institution ? 'border-fire' : ''}`}
          placeholder="e.g. IIT Delhi"
        />
      </div>

      <div>
        <label className={labelClass}>
          Achievement Title * {errors.achievement && <span className="text-fire ml-2">{errors.achievement}</span>}
        </label>
        <input
          name="achievement"
          value={formData.achievement}
          onChange={handleChange}
          className={`${inputClass} ${errors.achievement ? 'border-fire' : ''}`}
          placeholder="e.g. National Youth Ideathon Winner"
        />
      </div>

      <div>
        <label className={labelClass}>
          Date / Year * {errors.date && <span className="text-fire ml-2">{errors.date}</span>}
        </label>
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`${inputClass} ${errors.date ? 'border-fire' : ''}`}
          placeholder="e.g. 2024 or March 2024"
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Summary of the recognition..."
        />
      </div>

      <div>
        <label className={labelClass}>URL (Optional)</label>
        <input
          name="url"
          value={formData.url}
          onChange={handleChange}
          className={inputClass}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className={labelClass}>Evidence / Image</label>
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-xs text-muted font-mono
              file:mr-4 file:py-2 file:px-4
              file:border file:border-subtle
              file:font-rajdhani file:font-bold
              file:bg-deep file:text-electric
              hover:file:bg-hover transition-all"
          />
          {formData.image && (
            <div className="relative w-full h-32 border border-subtle bg-deep">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover p-2" />
              <button 
                type="button"
                onClick={() => setFormData(p => ({ ...p, image: null }))}
                className="absolute top-2 right-2 bg-fire text-void p-1 hover:scale-110 transition-transform"
              >
                <span className="text-[10px] font-bold">REMOVE</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 bg-deep p-4 border border-subtle">
        <input
          type="checkbox"
          id="showOnPortfolio"
          name="showOnPortfolio"
          checked={formData.showOnPortfolio}
          onChange={handleChange}
          className="w-4 h-4 accent-electric"
        />
        <label htmlFor="showOnPortfolio" className="font-mono text-sm text-secondary cursor-pointer select-none">
          SHOW ON PUBLIC PORTFOLIO
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
          ARCHIVE_AWARD
        </button>
      </div>
    </form>
  );
}
