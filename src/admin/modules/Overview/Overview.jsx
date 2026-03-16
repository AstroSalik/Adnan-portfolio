import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  Rocket, 
  Send, 
  Star, 
  BookOpen, 
  AlertCircle,
  Plus,
  PenLine,
  ChevronRight
} from 'lucide-react';
import StatCard from './StatCard';
import ActivityFeed from './ActivityFeed';
import { useLocalStorage, KEYS } from '../../../hooks/useLocalStorage';

export default function Overview({ onModuleChange }) {
  const [projects] = useLocalStorage(KEYS.PROJECTS, []);
  const [outreach] = useLocalStorage(KEYS.OUTREACH, []);
  const [recognition] = useLocalStorage(KEYS.RECOGNITION, []);
  const [activities] = useLocalStorage(KEYS.ACTIVITY, []);

  const deployedCount = projects.filter(p => p.status === 'DEPLOYED').length;
  const overdueFollowups = outreach.filter(o => o.followUpDate && new Date(o.followUpDate) < new Date()).length;

  const quickActions = [
    { icon: Plus,      label: 'New Project',    color: 'electric', module: 'cms' },
    { icon: Send,      label: 'Log Outreach',   color: 'success',  module: 'outreach' },
    { icon: Star,      label: 'Add Award',      color: 'gold',     module: 'recognition' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 sm:space-y-10">
      {/* SYSTEM HEADER (Mobile Only) */}
      <div className="md:hidden flex flex-col gap-2 p-4 bg-deep/50 border border-subtle border-l-4 border-l-electric">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] text-electric tracking-[0.2em]">CORE SYSTEM ACTIVE</span>
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>
        <div className="font-orbitron font-black text-xl text-primary tracking-widest">
          UNIT: ADNAN LONE
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 px-2 sm:px-0">
        <StatCard label="Total Projects"  value={projects.length}    icon={FolderKanban} color="electric" />
        <StatCard label="Deployed"        value={deployedCount}      icon={Rocket}       color="success" />
        <StatCard label="Outreach"        value={outreach.length}    icon={Send}         color="electric" />
        <StatCard label="Awards Logged"   value={recognition.length} icon={Star}         color="gold"     />
        <StatCard label="Overdue"         value={overdueFollowups}   icon={AlertCircle}  color="fire"     />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-8 sm:gap-10">
        {/* LEFT COLUMN: ACTIVITY FEED */}
        <div className="order-2 xl:order-1 px-2 sm:px-0">
          <ActivityFeed activities={activities.slice(0, 10)} />
        </div>

        {/* RIGHT COLUMN: QUICK ACTIONS */}
        <div className="space-y-6 order-1 xl:order-2 px-2 sm:px-0">
          <div className="flex items-center gap-3">
            <span className="text-electric font-mono text-xs">//</span>
            <h3 className="font-mono text-muted text-[10px] tracking-[0.3em] uppercase">
              QUICK COMMANDS
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                onClick={() => onModuleChange(action.module)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 6, borderColor: 'rgba(0,212,255,1)' }}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-panel border border-subtle p-4 sm:p-5 text-left transition-all duration-300 relative overflow-hidden"
              >
                <div className="p-2 sm:p-3 bg-deep border border-subtle group-hover:border-electric transition-colors">
                  <action.icon size={18} className="text-electric" />
                </div>
                <div className="flex-1">
                  <span className="font-rajdhani font-bold text-[10px] sm:text-sm uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
                    {action.label}
                  </span>
                </div>
                <ChevronRight size={14} className="hidden sm:block text-muted group-hover:text-electric transition-colors" />
                
                {/* Diagonal Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 -mr-4 -mt-4 bg-electric/5 rotate-45 group-hover:bg-electric/20 transition-colors" />
              </motion.button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-subtle/30 opacity-70">
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-4 sm:gap-2 select-none">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted">SYSTEM STATUS</span>
                <span className="font-mono text-[8px] text-success font-bold">NOMINAL</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted">STORAGE USED</span>
                <span className="font-mono text-[8px] text-primary">{(JSON.stringify(localStorage).length / 1024).toFixed(2)} KB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
