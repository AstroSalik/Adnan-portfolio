import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GlitchText from '../ui/GlitchText';
import Typewriter from '../ui/Typewriter';

const Hero = () => {
  const phrases = [
    'Convolutional Neural Networks',
    'Computer Vision',
    'Embedded AI Systems',
    'Building from Kashmir'
  ];

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-start pl-[8vw] pr-8 overflow-hidden pt-[70px]"
    >
      {/* Blended Hero Image */}
      <div className="absolute top-0 right-0 w-full h-full md:w-1/2 overflow-hidden pointer-events-none z-0">
        <motion.div
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 0.45, scale: 1 }}
           transition={{ duration: 1.5, ease: 'easeOut' }}
           className="w-full h-full"
        >
          <img 
            src="/Adnan-Hero.jpeg" 
            alt="Adnan Mushtaq Lone" 
            className="w-full h-full object-cover object-top"
            style={{
              maskImage: 'linear-gradient(to left, black 30%, transparent 100%), linear-gradient(to top, black 70%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%), linear-gradient(to top, black 70%, transparent 100%)',
              WebkitMaskComposite: 'source-in'
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Top Label */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-text-muted text-sm tracking-widest mb-4 uppercase"
        >
          // deep learning engineer & founder
        </motion.p>

        {/* Glitch Name */}
        <GlitchText 
          text="ADNAN MUSHTAQ LONE" 
          className="font-orbitron font-black text-text-primary uppercase tracking-[0.05em] text-[clamp(2.5rem,7vw,6.5rem)] leading-none mb-6 block"
        />

        {/* Typewriter Subtitle */}
        <div className="h-8 mb-10">
          <Typewriter 
            phrases={phrases}
            className="font-mono text-electric text-[clamp(1rem,3vw,1.4rem)] uppercase tracking-wider h-full"
          />
        </div>

        {/* Award Badges */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="flex flex-wrap gap-4 mb-10"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            className="bg-electric/10 border border-electric/40 font-rajdhani font-semibold text-text-secondary text-sm px-4 py-2"
            aria-label="Award: PM of India Award 2023"
          >
            🇮🇳 PM OF INDIA AWARD 2023
          </motion.div>
        </motion.div>


        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-6"
        >
          <motion.a
            href="#projects"
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,212,255,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="bg-electric text-void font-orbitron text-sm tracking-[0.15em] px-10 py-5 font-bold uppercase transition-all"
            aria-label="View Project Portfolio"
          >
            VIEW PROJECTS
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -2, backgroundColor: 'rgba(0,212,255,0.08)' }}
            whileTap={{ scale: 0.97 }}
            className="border border-electric text-electric font-orbitron text-sm tracking-[0.15em] px-10 py-5 bg-transparent uppercase transition-all"
            aria-label="Download CV"
          >
            DOWNLOAD CV
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Chevron */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-60 text-electric flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
