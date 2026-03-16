import React from 'react';

const TYPE_COLORS = {
  // Categories
  AGRICULTURE: 'border-success/40 text-success bg-success/15',
  AUTONOMOUS: 'border-electric/40 text-electric bg-electric/15',
  DETECTION: 'border-gold/40 text-gold bg-gold/15',
  DEFENCE: 'border-fire/40 text-fire bg-fire/15',
  ASSISTIVE: 'border-purple/40 text-purple bg-purple/15',
  
  // Status
  DEPLOYED: 'border-success/40 text-success bg-success/15',
  PROTOTYPE: 'border-electric/40 text-electric bg-electric/15',
  CONCEPT: 'border-text-muted/40 text-text-muted bg-text-muted/15',
  
  // Recognition
  AWARD: 'border-gold/40 text-gold bg-gold/15',
  PRESS: 'border-fire/40 text-fire bg-fire/15',
  COMMENDATION: 'border-electric/40 text-electric bg-electric/15',
  COMPETITION: 'border-purple/40 text-purple bg-purple/15',
  FEATURE: 'border-success/40 text-success bg-success/15',
};

export default function Badge({ label, type }) {
  const colorClass = TYPE_COLORS[type] || 'border-subtle text-muted bg-panel';

  return (
    <span className={`inline-block font-rajdhani font-bold text-[10px] uppercase px-2 py-0.5 border rounded-sm tracking-widest ${colorClass}`}>
      {label || type}
    </span>
  );
}
