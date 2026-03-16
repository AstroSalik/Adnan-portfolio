import { motion } from 'framer-motion';

const HexCard = ({ expertise, index }) => {
  const Icon = expertise.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
      className="relative w-[220px] h-[254px] hex-clip bg-panel flex flex-col items-center justify-center p-6 cursor-default transition-all duration-300 group"
    >
      {/* Radial Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-electric mb-3 transform group-hover:scale-110 transition-transform">
          <Icon size={40} strokeWidth={1.5} />
        </div>
        
        <h3 className="font-orbitron font-bold text-primary text-[0.85rem] text-center leading-tight mb-2">
          {expertise.domain}
        </h3>
        
        <p className="font-mono text-muted text-[0.65rem] text-center px-2">
          {expertise.tools}
        </p>
      </div>
      
      {/* Decorative Border Glow */}
      <div className="absolute inset-0 border border-electric/10 hex-clip pointer-events-none group-hover:border-electric/50 transition-colors" />
    </motion.div>
  );
};

export default HexCard;
