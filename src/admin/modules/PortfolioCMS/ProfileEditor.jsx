import React, { useState } from 'react';
import TagInput from '../../../components/TagInput';
import { motion } from 'framer-motion';

export default function ProfileEditor({ profile, onSave }) {
  const [formData, setFormData] = useState({
    about: ['', '', ''],
    skills: [],
    contact: {
      email: '',
      linkedin: '',
      github: ''
    },
    tagline: '',
    ...profile
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'about') {
      const newAbout = [...formData.about];
      newAbout[index] = value;
      setFormData(prev => ({ ...prev, about: newAbout }));
    } else if (name.startsWith('contact.')) {
      const contactKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: { ...prev.contact, [contactKey]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillsChange = (newSkills) => {
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const labelClass = "block font-mono text-electric text-[10px] tracking-widest uppercase mb-2";
  const inputClass = "w-full bg-input border border-subtle focus:border-electric outline-none py-3 px-4 font-mono text-primary text-sm transition-colors";

  return (
    <div className="max-w-4xl space-y-12 pb-20">
      {/* SECTION: HERO */}
      <section className="bg-panel border border-subtle p-8">
        <h3 className="font-orbitron text-lg text-primary mb-6 flex items-center gap-3">
          <span className="text-electric font-mono text-sm">//</span> HERO_IDENTIFIER
        </h3>
        <div>
          <label className={labelClass}>Hero Tagline</label>
          <input
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. Architecting the Future of Intelligent Systems"
          />
        </div>
      </section>

      {/* SECTION: ABOUT */}
      <section className="bg-panel border border-subtle p-8">
        <h3 className="font-orbitron text-lg text-primary mb-6 flex items-center gap-3">
          <span className="text-electric font-mono text-sm">//</span> BIOGRAPHICAL_DATA
        </h3>
        <div className="space-y-6">
          {formData.about.map((text, i) => (
            <div key={i}>
              <label className={labelClass}>Paragraph {i + 1}</label>
              <textarea
                name="about"
                value={text}
                onChange={(e) => handleChange(e, i)}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder={`Tell your story... Part ${i + 1}`}
              />
              <div className="text-right mt-1 font-mono text-[9px] text-muted">
                {text.length} chars
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: SKILLS */}
      <section className="bg-panel border border-subtle p-8">
        <h3 className="font-orbitron text-lg text-primary mb-6 flex items-center gap-3">
          <span className="text-electric font-mono text-sm">//</span> SKILL_MATRIX
        </h3>
        <TagInput 
          tags={formData.skills} 
          onChange={handleSkillsChange} 
          placeholder="// add expertise..."
        />
      </section>

      {/* SECTION: CONTACT */}
      <section className="bg-panel border border-subtle p-8">
        <h3 className="font-orbitron text-lg text-primary mb-6 flex items-center gap-3">
          <span className="text-electric font-mono text-sm">//</span> CONTACT_ENDPOINTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Email</label>
            <input
              name="contact.email"
              value={formData.contact.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="operator@system.io"
            />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input
              name="contact.linkedin"
              value={formData.contact.linkedin}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://linkedin.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              name="contact.github"
              value={formData.contact.github}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSave(formData)}
          className="px-10 py-4 bg-electric text-void font-orbitron font-bold tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all"
        >
          UPDATE_PROFILE_CORE
        </motion.button>
      </div>
    </div>
  );
}
