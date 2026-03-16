import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Awards', href: '#awards' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[70px] z-[90] backdrop-blur-xl bg-void/90 border-b border-subtle/30">
        {/* Scroll Progress Bar */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute top-0 left-0 h-[2px] w-full bg-electric origin-left"
        />

        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#home"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            aria-label="Adnan Portfolio Home"
          >
            <div className="w-10 h-10 border border-electric p-2 flex items-center justify-center font-orbitron font-bold text-electric text-xl leading-none" aria-hidden="true">
              AM
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={`Navigate to ${link.name}`}
                className={`font-rajdhani font-semibold uppercase tracking-widest text-sm transition-all duration-300 relative py-1 ${
                  activeSection === link.href.substring(1)
                    ? 'text-electric'
                    : 'text-text-secondary hover:text-electric'
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-electric"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-electric"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-void z-[80] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className={`font-orbitron text-2xl uppercase tracking-widest ${
                  activeSection === link.href.substring(1)
                    ? 'text-electric'
                    : 'text-text-primary'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
