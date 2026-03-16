import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', type = 'danger' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-sm bg-panel border border-subtle p-8 z-10"
          >
            <AlertTriangle className="w-10 h-10 text-fire mx-auto mb-4" />
            <h3 className="font-orbitron text-lg text-primary text-center">{title}</h3>
            <p className="font-mono text-secondary text-sm text-center mt-2">
              {message}
            </p>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 py-2 border border-subtle text-muted hover:text-primary transition-colors font-rajdhani font-bold"
              >
                CANCEL
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 py-2 ${type === 'danger' ? 'bg-fire' : 'bg-electric'} text-void font-rajdhani font-bold`}
              >
                {confirmText.toUpperCase()}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
