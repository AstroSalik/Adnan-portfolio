import { motion } from 'framer-motion';

const TimelineNode = ({ year, institution, achievement, description, side, accentStyle = {} }) => {
  const isLeft = side === 'left';

  return (
    <div className={`relative flex items-center justify-center w-full mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        viewport={{ once: true }}
        className={`w-full md:w-[45%] bg-panel p-6 shadow-xl relative z-10 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
        style={accentStyle}
      >
        <div className="font-orbitron text-gold font-bold text-xl mb-1">{year}</div>
        <div className="font-orbitron font-bold text-primary text-sm tracking-widest uppercase mb-3">{institution}</div>
        <h3 className="font-orbitron font-black text-electric text-lg mb-4">{achievement}</h3>
        <p className="font-mono text-secondary text-sm leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Center Marker */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-electric border-4 border-void z-20 hidden md:block" />

      {/* Spacer for other side */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

export default TimelineNode;
