import React from 'react';
import { Menu } from 'lucide-react';

export default function TopBar({ moduleTitle, quickAction, onMenuToggle, sidebarWidth, windowWidth, isFlexible }) {
  return (
    <header 
      className={`fixed top-0 right-0 h-[60px] bg-deep/80 backdrop-blur-md border-b border-subtle flex items-center justify-between px-4 md:px-8 z-30 transition-all duration-300 ${isFlexible ? '' : 'left-0'}`}
      style={{ 
        left: windowWidth >= 768 ? (isFlexible ? 'auto' : sidebarWidth) : 0,
        width: windowWidth >= 768 && isFlexible ? `calc(100% - ${sidebarWidth})` : '100%'
      }}
    >
      <div className="flex items-center pointer-events-auto">
        <button 
          onClick={onMenuToggle}
          className="md:hidden mr-4 text-electric hover:bg-electric/10 p-1 transition-colors"
        >
          <Menu size={20} />
        </button>
        <span className="text-electric font-mono text-lg mr-2 hidden sm:inline">//</span>
        <h1 className="font-orbitron text-sm md:text-lg text-primary tracking-widest truncate max-w-[150px] sm:max-w-none">
          {moduleTitle.toUpperCase()}
        </h1>
      </div>


      <div className="flex items-center gap-4 pointer-events-auto">
        {quickAction && (
          <button
            onClick={quickAction.onClick}
            className="border border-electric text-electric hover:bg-electric/10 transition-colors font-rajdhani text-sm px-4 py-1.5 font-bold tracking-wider"
          >
            {quickAction.label.toUpperCase()}
          </button>
        )}

        <div className="h-8 w-[1px] bg-subtle/30" />

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-muted tracking-widest leading-none">OPERATOR</span>
            <span className="font-rajdhani text-xs font-bold text-primary tracking-wider mt-1">ADNAN LONE</span>
          </div>
          <div className="bg-electric w-10 h-10 flex items-center justify-center font-orbitron text-void font-black text-sm relative">
            AM
            {/* Status pulse */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-deep animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}
