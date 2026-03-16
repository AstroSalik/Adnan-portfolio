import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileCode2, 
  Columns, 
  Send, 
  Star, 
  BookOpen, 
  Download, 
  Lock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { storage } from '../../hooks/useLocalStorage';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview',       id: 'overview' },
  { icon: FileCode2,       label: 'Portfolio CMS',  id: 'cms' },
  { icon: Columns,         label: 'Project Tracker',id: 'tracker' },
  { icon: Send,            label: 'Outreach Log',   id: 'outreach' },
  { icon: Star,            label: 'Recognition',    id: 'recognition' },
];

export default function Sidebar({ activeModule, onModuleChange, onLock, isOpen, setIsOpen, collapsed, setCollapsed, windowWidth }) {

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: windowWidth >= 768 ? (collapsed ? 64 : 260) : 260,
        x: windowWidth >= 768 ? 0 : (isOpen ? 0 : -260)
      }}
      className={`${windowWidth >= 768 ? 'sticky' : 'fixed'} left-0 top-0 h-screen bg-deep border-r border-subtle flex flex-col z-50 pointer-events-auto shadow-xl`}
    >
      {/* TOP: Logo Area */}
      <div className="h-[70px] flex items-center px-6 overflow-hidden whitespace-nowrap">
        <div className="font-orbitron text-xl text-electric font-black flex-shrink-0">AM</div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-3 flex flex-col"
          >
            <span className="font-mono text-muted text-[0.6rem] tracking-[0.2em] leading-none">COMMAND</span>
            <span className="font-mono text-muted text-[0.6rem] tracking-[0.2em] leading-none mt-1">PORTAL</span>
          </motion.div>
        )}
      </div>

      {/* MIDDLE: Nav Items */}
      <div className="flex-1 py-6 overflow-y-auto no-scrollbar">
        {!collapsed && (
          <div className="font-mono text-muted text-[10px] tracking-widest px-6 mb-4 opacity-50">
            // MODULES
          </div>
        )}

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`relative group flex items-center w-full transition-all duration-200 ${
                  isActive ? 'text-electric' : 'text-secondary hover:text-primary hover:bg-hover/50'
                } ${collapsed ? 'justify-center py-4' : 'px-6 py-3'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 h-full w-[3px] bg-electric"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                
                <Icon size={18} className={isActive ? 'text-electric' : 'text-text-muted group-hover:text-primary'} />
                
                {!collapsed && (
                  <span className="ml-3 font-rajdhani font-semibold text-sm uppercase tracking-wider">
                    {item.label}
                  </span>
                )}

                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-panel border border-subtle rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-rajdhani text-xs uppercase z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM: System Items */}
      <div className="pb-6">
        {!collapsed && (
          <div className="font-mono text-muted text-[10px] tracking-widest px-6 mb-4 opacity-50">
            // SYSTEM
          </div>
        )}

        <div className="space-y-1">
          <button
            onClick={storage.export}
            className={`flex items-center w-full text-secondary hover:text-primary hover:bg-hover/50 transition-all ${
              collapsed ? 'justify-center py-4' : 'px-6 py-3'
            }`}
          >
            <Download size={18} />
            {!collapsed && <span className="ml-3 font-rajdhani font-semibold text-sm uppercase tracking-wider">Export Data</span>}
          </button>
          
          <button
            onClick={onLock}
            className={`flex items-center w-full text-secondary hover:text-fire hover:bg-fire/10 transition-all ${
              collapsed ? 'justify-center py-4' : 'px-6 py-3'
            }`}
          >
            <Lock size={18} />
            {!collapsed && <span className="ml-3 font-rajdhani font-semibold text-sm uppercase tracking-wider">Lock</span>}
          </button>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center w-full text-muted hover:text-primary transition-all mt-4 ${
              collapsed ? 'justify-center py-4' : 'px-6 py-3'
            }`}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span className="ml-3 font-mono text-[10px] uppercase tracking-widest">Collapse Sidebar</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
