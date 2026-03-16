import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ phrases, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 15);
      }
    } else {
      if (displayText === currentPhrase) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 30);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  return (
    <div className={className}>
      {displayText}
      <motion.span
        className="text-electric ml-1 border-l-2 border-electric"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
    </div>
  );
};

export default Typewriter;
