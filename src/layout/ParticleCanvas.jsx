import { useRef } from 'react';
import { useParticles } from '../hooks/useParticles';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#050816' }}
    />
  );
};

export default ParticleCanvas;
