import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import Badge from '../../../components/Badge';

const GLOWS = {
  AWARD: 'hover:shadow-[0_0_30px_rgba(245,166,35,0.25)]',
  PRESS: 'hover:shadow-[0_0_30px_rgba(233,69,96,0.2)]',
  COMMENDATION: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]',
  COMPETITION: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
  FEATURE: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]',
};

const BORDERS = {
  AWARD: 'border-t-2 border-t-gold',
  PRESS: 'border-l-4 border-l-fire',
  COMMENDATION: 'border-t-2 border-t-electric',
  COMPETITION: 'border-l-4 border-l-purple',
  FEATURE: 'border-t-2 border-t-success',
};

export default function RecognitionGrid({ entries, onEdit, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="bg-panel border border-subtle p-12 text-center col-span-full">
        <p className="font-mono text-muted text-sm tracking-widest">// RECOGNITION WALL IS EMPTY</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <AnimatePresence>
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4 }}
            className={`bg-panel border border-subtle overflow-hidden flex flex-col group transition-all duration-300 ${BORDERS[entry.type]} ${GLOWS[entry.type]}`}
          >
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start gap-2 mb-4">
                <Badge label={entry.type} type={entry.type} />
                <span className="font-mono text-muted text-[10px] whitespace-nowrap">{entry.date}</span>
              </div>

              <h3 className="font-orbitron font-bold text-primary text-sm mb-1 leading-tight group-hover:text-electric transition-colors">
                {entry.institution}
              </h3>
              <p className="font-mono text-electric text-xs font-semibold mb-3">
                {entry.achievement}
              </p>
              
              <p className="font-mono text-secondary text-[11px] leading-relaxed line-clamp-3 opacity-70 group-hover:opacity-100 transition-opacity">
                {entry.description}
              </p>

              {entry.image && (
                <div className="mt-4 aspect-video border border-subtle bg-deep overflow-hidden">
                  <img src={entry.image} alt={entry.achievement} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="px-5 py-3 bg-deep/50 border-t border-subtle/30 flex items-center justify-between">
              <div className="flex gap-4">
                {entry.url && (
                  <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-electric transition-colors">
                    <ExternalLink size={14} />
                  </a>
                )}
                {entry.showOnPortfolio ? (
                  <Eye size={14} className="text-success" title="Visible on Portfolio" />
                ) : (
                  <EyeOff size={14} className="text-muted/30" title="Hidden from Portfolio" />
                )}
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => onEdit(entry)} className="text-muted hover:text-electric transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => onDelete(entry.id)} className="text-muted hover:text-fire transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
