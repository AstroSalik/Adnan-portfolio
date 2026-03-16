import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';

const StatCard = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(value, isInView);

  return (
    <div 
      ref={ref}
      className="bg-panel border-l-4 border-electric p-7 transition-all duration-300 hover:translate-x-1"
    >
      <div className="font-orbitron font-black text-5xl text-electric leading-none">
        {count}
      </div>
      <div className="font-rajdhani uppercase tracking-widest text-muted text-sm mt-2">
        {label}
      </div>
    </div>
  );
};

export default StatCard;
