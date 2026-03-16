import { useState, useEffect } from 'react';

export function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Handle non-numeric values
    if (typeof target !== 'number') {
      setCount(target);
      return;
    }

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutExpo
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easing * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
}
