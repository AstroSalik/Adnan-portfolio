import React from 'react';
import { Edit2, Trash2, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import Badge from '../../../components/Badge';

export default function OutreachTable({ entries, onEdit, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="bg-panel border border-subtle p-12 text-center">
        <p className="font-mono text-muted text-sm tracking-widest">// NO OUTREACH ENTRIES RECORDED</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border border-subtle bg-panel">
      <table className="w-full text-left border-collapse">
        <thead className="bg-deep border-b border-subtle">
          <tr className="font-mono text-muted text-[10px] uppercase tracking-widest">
            <th className="px-6 py-4 font-medium">DATE</th>
            <th className="px-6 py-4 font-medium">TYPE</th>
            <th className="px-6 py-4 font-medium">ORGANISATION</th>
            <th className="px-6 py-4 font-medium">STATUS</th>
            <th className="px-6 py-4 font-medium">FOLLOW-UP</th>
            <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-subtle/30 font-mono text-xs">
          {entries.map((entry) => {
            const isOverdue = entry.followUpDate && new Date(entry.followUpDate) < new Date() && entry.status !== 'CLOSED WON' && entry.status !== 'CLOSED LOST';
            
            return (
              <tr 
                key={entry.id} 
                className={`hover:bg-hover/30 transition-colors group ${isOverdue ? 'bg-gold/5' : ''}`}
              >
                <td className="px-6 py-4 text-muted">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <Badge label={entry.type} type={entry.type} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-primary font-semibold">{entry.organisation}</span>
                    <span className="text-muted text-[10px] mt-0.5 line-clamp-1">{entry.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge label={entry.status} type={entry.status === 'SENT' ? 'AUTONOMOUS' : entry.status === 'REPLIED' ? 'DETECTION' : entry.status === 'IN PROGRESS' ? 'AGRICULTURE' : entry.status === 'CLOSED WON' ? 'DEPLOYED' : entry.status === 'CLOSED LOST' ? 'DEFENCE' : 'CONCEPT'} />
                </td>
                <td className="px-6 py-4">
                  {entry.followUpDate ? (
                    <div className={`flex items-center gap-2 ${isOverdue ? 'text-gold' : 'text-muted'}`}>
                      {isOverdue && <AlertTriangle size={12} />}
                      {new Date(entry.followUpDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <span className="text-muted/30">---</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => onEdit(entry)} className="text-electric hover:text-white transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => onDelete(entry.id)} className="text-fire hover:text-white transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
