import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Drawer({ isOpen, onClose, title, children, footer, isDirty }) {
  const handleClose = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. Close anyway?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-[480px] bg-deep border-l border-subtle z-50 flex flex-col"
          >
            <div className="border-b border-subtle px-6 py-4 flex justify-between items-center">
              <h2 className="font-orbitron text-lg text-primary">{title}</h2>
              <button
                onClick={handleClose}
                className="text-muted hover:text-fire transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 px-6 py-6 custom-scrollbar">
              {children}
            </div>

            {footer && (
              <div className="border-t border-subtle px-6 py-4 flex gap-3 justify-end">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
