import { useEffect, useCallback, useRef } from 'react';

export const useParticles = (canvasRef) => {
  const particles = useRef([]);
  const requestRef = useRef();

  const initParticles = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1280;
    const count = isMobile ? 40 : isTablet ? 60 : 120;
    
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((p, i) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < 0) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = 0;
      if (p.y < 0) p.y = window.innerHeight;
      if (p.y > window.innerHeight) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      ctx.fill();

      // Draw lines
      for (let j = i + 1; j < particles.current.length; j++) {
        const p2 = particles.current[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${1 - dist / 120})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [canvasRef]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        initParticles();
      }
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('resize', handleResize);
    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [animate, initParticles, canvasRef]);
};
