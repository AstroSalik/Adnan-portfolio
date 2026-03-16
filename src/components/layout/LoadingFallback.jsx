import { motion } from 'framer-motion';

const LoadingFallback = () => {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full"
        />
        {/* Inner Ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-2 border-purple-500/20 border-b-purple-500 rounded-full"
        />
        {/* Center Dot */}
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-[30%] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />
      </div>
    </div>
  );
};

export default LoadingFallback;
