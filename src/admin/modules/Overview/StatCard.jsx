import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../../hooks/useCountUp';

const COLOR_MAP = {
  electric: 'text-electric',
  success: 'text-success',
  gold: 'text-gold',
  purple: 'text-purple',
  fire: 'text-fire',
};

const BORDER_MAP = {
  electric: 'group-hover:border-electric',
  success: 'group-hover:border-success',
  gold: 'group-hover:border-gold',
  purple: 'group-hover:border-purple',
  fire: 'group-hover:border-fire',
};

export default function StatCard({ label, value, icon: Icon, color = 'electric' }) {
  const displayValue = useCountUp(value);

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className={`group relative bg-panel border border-subtle p-4 sm:p-5 transition-all duration-300 overflow-hidden ${BORDER_MAP[color]}`}
    >
      {/* Background Glow */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity bg-current ${COLOR_MAP[color]}`} />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 scanline opacity-[0.03] pointer-events-none" />

      <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-4">
        <div className={`${COLOR_MAP[color]} flex-shrink-0`}>
          <Icon size={window.innerWidth < 640 ? 20 : 24} />
        </div>
        
        <div className="flex flex-col items-end sm:items-start flex-1">
          <div className={`font-orbitron font-black text-2xl sm:text-4xl ${COLOR_MAP[color]} tracking-wider leading-none`}>
            {displayValue}
          </div>
          
          <div className="font-mono text-muted text-[8px] sm:text-[10px] uppercase tracking-[0.2em] mt-1 sm:mt-2 text-right sm:text-left">
            {label}
          </div>
        </div>
      </div>
      
      {/* Footer Accent */}
      <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-current ${COLOR_MAP[color]}`} />
    </motion.div>
  );
}
