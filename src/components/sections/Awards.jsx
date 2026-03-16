import { motion } from 'framer-motion';
import TimelineNode from '../ui/TimelineNode';

const Awards = () => {
  return (
    <section id="awards" className="bg-void py-[120px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <p className="font-mono text-electric text-sm tracking-widest uppercase mb-4">
            // 02 — RECOGNITION
          </p>
          <h2 className="font-orbitron font-bold text-primary text-[clamp(1.8rem,3vw,2.8rem)] leading-tight">
            Validated by India's <span className="text-electric">Highest Institutions.</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] hidden md:block overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="w-full bg-gradient-to-b from-electric via-electric to-transparent"
            />
          </div>

          <div className="flex flex-col gap-12">
            <TimelineNode 
              year="2023"
              institution="IIT DELHI"
              achievement="Youth Ideathon — Top 10 Nationally"
              description="Competed against hundreds of student innovators from across India. The Apple Grading System — an AI-powered agricultural sorter — earned recognition among the top 10 most impactful innovations at India's premier technology institute."
              side="left"
              accentStyle={{ borderLeft: '4px solid #F5A623' }}
            />

            <TimelineNode 
              year="2023"
              institution="National Technology Week"
              achievement="Personal Appreciation — PM Shri Narendra Modi"
              description="During National Technology Week 2023, Adnan's work received direct recognition from the Prime Minister of India — an acknowledgement of its real-world impact and innovation from the northern frontier."
              side="right"
              accentStyle={{ borderTop: '4px solid #FF9933' }}
            />
          </div>
        </div>

        {/* Media Coverage Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ boxShadow: '0 0 30px rgba(233,69,96,0.2)' }}
          className="bg-panel border-l-4 border-fire p-8 max-w-4xl mx-auto mt-20 group transition-all duration-300"
        >
          <div className="font-orbitron text-[10px] text-muted font-bold tracking-[0.3em] uppercase mb-4 group-hover:text-fire transition-colors">
            — THE INDIAN EXPRESS // MEDIA ARCHIVE —
          </div>
          <h3 className="font-mono text-primary text-xl md:text-2xl leading-snug mb-4">
            "Students from Kashmir develop AI-powered Apple Grader for local farmers"
          </h3>
          <p className="font-mono text-muted text-sm italic">
            Featured story covering the Baramulla district students whose innovation reached national spotlight during National Technology Week.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;
