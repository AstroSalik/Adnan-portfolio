import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PassphraseGate({ onUnlock }) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPass = import.meta.env.VITE_DASHBOARD_PASS || 'adnan2026';
    if (passphrase === correctPass) {
      setError(false);
      sessionStorage.setItem('adnan_auth', 'true');
      onUnlock();
    } else {

      setError(true);
      setPassphrase('');
      // Reset error state after shake animation
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-void flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md bg-panel border border-subtle p-12 shadow-2xl relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-electric opacity-50" />
        
        <div className="text-center mb-10">
          <div className="font-orbitron text-6xl text-electric border-2 border-electric px-4 py-2 inline-block mx-auto mb-4 scale-75">
            AM
          </div>
          <p className="font-mono text-muted text-[10px] tracking-[0.3em] uppercase">
            // COMMAND TERMINAL
          </p>
        </div>

        <h2 className="font-orbitron text-2xl text-primary text-center mb-8 tracking-wider">
          ENTER PASSPHRASE
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            animate={error ? { x: [0, -12, 12, -12, 12, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="________________"
              className={`w-full bg-input border-2 ${error ? 'border-fire' : 'border-subtle'} focus:border-electric outline-none py-3 px-4 font-mono text-center tracking-widest text-primary transition-colors`}
              autoFocus
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-fire text-[10px] mt-2 text-center tracking-widest"
                >
                  // ACCESS DENIED
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            whileHover={{ opacity: 0.9, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-electric text-void font-orbitron font-bold py-4 tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          >
            ENTER TERMINAL
          </motion.button>
        </form>

        <div className="mt-12 flex justify-between items-center opacity-30 select-none">
          <div className="font-mono text-[8px] text-muted tracking-widest">v1.0.42_STABLE</div>
          <div className="font-mono text-[8px] text-muted tracking-widest">SECURE_LINK_ACTIVE</div>
        </div>
      </div>
    </motion.div>
  );
}
