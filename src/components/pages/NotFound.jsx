import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center text-text-primary px-4 selection:bg-cyan-500/30">
      {/* Background Glitch Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-8xl md:text-9xl font-black font-orbitron tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4">
          404
        </h1>
        
        <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-8 animate-pulse">
          // PAGE NOT FOUND
        </p>

        <div className="max-w-md mx-auto mb-12">
          <p className="text-text-secondary leading-relaxed font-inter">
            The data stream you're looking for has been lost in the void. It seems this coordinate in the neural network doesn't exist.
          </p>
        </div>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3 bg-white text-void font-bold font-orbitron text-sm tracking-widest overflow-hidden transition-colors"
          >
            <span className="relative z-10">RETURN TO BASE</span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Technical Detail */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-text-secondary/30 uppercase tracking-[0.5em]">
        Error Status: 0x000404 | Access Denied
      </div>
    </div>
  );
};

export default NotFound;
