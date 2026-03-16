import { useState, useEffect } from 'react';

const GlitchText = ({ text, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Initial entrance glitch
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 600);

    // Occasional glitch
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      className={`relative inline-block ${className} ${isGlitching ? 'glitch-active' : ''}`}
      data-text={text}
    >
      {text}
    </div>
  );
};

export default GlitchText;
