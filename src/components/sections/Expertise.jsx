import { motion } from 'framer-motion';
import HexCard from '../ui/HexCard';
import { expertise } from '../../data/expertise';

const Expertise = () => {
  return (
    <section id="expertise" className="bg-deep py-[120px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="font-mono text-electric text-sm tracking-widest uppercase mb-4">
            // 03 — EXPERTISE
          </p>
          <h2 className="font-orbitron font-bold text-primary text-[clamp(1.8rem,3vw,2.8rem)] leading-tight">
            Core Technical <span className="text-electric">Domains.</span>
          </h2>
        </div>

        {/* Honeycomb Grid Container */}
        <div className="flex flex-col items-center">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-4">
            {expertise.slice(0, 3).map((item, i) => (
              <HexCard key={item.id} expertise={item} index={i} />
            ))}
          </div>
          
          {/* Row 2 - Offset */}
          <div className="flex flex-wrap justify-center gap-4 -mt-[32px] md:-mt-[44px]">
            {expertise.slice(3, 6).map((item, i) => (
              <HexCard key={item.id} expertise={item} index={i + 3} />
            ))}
          </div>
        </div>

        {/* Technical Label Overlay */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 font-mono text-void text-[10rem] font-black opacity-30 select-none pointer-events-none hidden lg:block uppercase tracking-tighter">
          Engine
        </div>
      </div>
    </section>
  );
};

export default Expertise;
