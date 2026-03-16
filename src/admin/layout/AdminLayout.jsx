import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ToastContainer from '../../components/Toast';
import { storage } from '../../hooks/useLocalStorage';

export default function AdminLayout({ activeModule, onModuleChange, children, quickAction, moduleTitle, onLock }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Always initialize storage on mount
  useEffect(() => {
    storage.initialize();
  }, []);

  // Close mobile menu on module change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeModule]);

  return (
    <div className="min-h-screen bg-void flex overflow-x-hidden">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={onModuleChange} 
        onLock={onLock}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        collapsed={isSidebarCollapsed}
        setCollapsed={setIsSidebarCollapsed}
        windowWidth={windowWidth}
      />
      
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative shadow-inner">
        <TopBar 
          moduleTitle={moduleTitle} 
          quickAction={quickAction} 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          sidebarWidth={isSidebarCollapsed ? '64px' : '260px'}
          windowWidth={windowWidth}
          isFlexible={true}
        />
        
        <div className="mt-[60px] p-4 md:p-8 min-h-[calc(100vh-60px)] relative">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
