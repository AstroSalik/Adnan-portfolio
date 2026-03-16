import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import StatCard from '../ui/StatCard';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    "CNN", "OpenCV", "TensorFlow", "Keras", "FPGA", 
    "Raspberry Pi", "YOLO", "LiDAR", "Python", 
    "C++", "Signal Processing", "Sensor Fusion"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="bg-deep py-[120px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-center">
          
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="font-mono text-electric text-sm tracking-widest uppercase mb-4">
              // 01 — ABOUT
            </p>
            <h2 className="font-orbitron font-bold text-primary text-[clamp(1.8rem,3vw,2.8rem)] mb-8 leading-tight">
              Engineering AI That <span className="text-electric">Solves Real Problems.</span>
            </h2>

            <div className="space-y-6 mb-10">
              <p className="font-mono text-secondary leading-relaxed text-[0.95rem]">
                From the valleys of Kashmir, Adnan Mushtaq Lone builds artificial intelligence that works in the real world — embedded in hardware, deployed in fields, and measured by lives improved.
              </p>
              <p className="font-mono text-secondary leading-relaxed text-[0.95rem]">
                Founder of <span className="text-electric">tiwzz</span> and CTO at <a href="https://www.zoonigia.com" target="_blank" rel="noopener noreferrer" className="text-electric hover:underline underline-offset-4">Zoonigia Pvt Ltd</a>, he operates at the intersection of deep learning and embedded systems, building everything from autonomous vehicles to agricultural sorters, from missile guidance concepts to assistive Braille devices.
              </p>
              <p className="font-mono text-secondary leading-relaxed text-[0.95rem]">
                With national recognition from IIT Delhi and a personal commendation from the Prime Minister of India, his work represents what's possible when frontier AI meets urgency.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={i}
                  whileHover={{ borderColor: '#00D4FF', color: '#00D4FF', scale: 1.05 }}
                  className="font-rajdhani text-sm font-semibold bg-panel border border-[#1E3A5F] text-text-secondary px-4 py-1 cursor-default transition-all duration-300 uppercase tracking-wider"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <motion.div variants={itemVariants}>
              <StatCard value="10" label="Projects" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard value="02" label="Awards" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard value="Top 10" label="India Rank" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard value="02" label="Startups" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
