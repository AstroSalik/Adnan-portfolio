import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function TagInput({ tags = [], onChange, placeholder = "// add tag...", accentColor = 'electric' }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.trim().replace(/,$/, '');
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
        setInput('');
      }
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const colorClass = {
    electric: 'border-electric/40 text-electric bg-electric/10',
    purple: 'border-purple/40 text-purple bg-purple/10',
    gold: 'border-gold/40 text-gold bg-gold/10'
  }[accentColor] || 'border-electric/40 text-electric bg-electric/10';

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-input border border-subtle font-mono min-h-[42px]">
      <AnimatePresence>
        {tags.map((tag, index) => (
          <motion.span
            key={tag}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm border text-xs ${colorClass}`}
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="hover:text-fire transition-colors"
            >
              <X size={12} />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 bg-transparent border-none outline-none text-primary text-sm min-w-[120px]"
      />
    </div>
  );
}
