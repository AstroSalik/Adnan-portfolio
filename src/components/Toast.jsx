import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const COLORS = {
  success: 'border-success text-success',
  error: 'border-fire text-fire',
  warning: 'border-gold text-gold',
  info: 'border-electric text-electric',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info;
          const colorClass = COLORS[toast.type] || COLORS.info;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`pointer-events-auto flex items-center gap-3 bg-panel border-l-4 ${colorClass} px-4 py-3 min-w-[300px] shadow-2xl`}
            >
              <Icon size={18} />
              <span className="font-mono text-primary text-sm flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted hover:text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
