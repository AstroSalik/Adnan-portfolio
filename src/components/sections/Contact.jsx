import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  const contactLinks = [
    { icon: Mail, label: 'adnanlone769@gmail.com', href: 'mailto:adnanlone769@gmail.com' },
    { icon: Linkedin, label: 'linkedin.com/in/adnan-mushtaq-lone', href: 'https://www.linkedin.com/in/adnan-mushtaq-lone-178b16262' },
    { icon: Github, label: 'github.com/adnanmushtaq', href: 'https://github.com/adnanmushtaq' },
  ];

  return (
    <section id="contact" className="bg-deep py-[140px] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-muted text-sm tracking-widest uppercase mb-6"
        >
          // 05 — CONTACT
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-orbitron font-black text-primary text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-8"
        >
          LET'S BUILD SOMETHING <span className="text-electric italic">IMPOSSIBLE.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-secondary text-[clamp(0.9rem,2vw,1.1rem)] mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          Available for research collaborations, technical partnerships, and frontier AI consulting.
        </motion.p>

        {/* Contact Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: '#00D4FF', backgroundColor: 'rgba(0, 212, 255, 0.05)' }}
                className="bg-panel border border-subtle p-8 flex flex-col items-center gap-4 group transition-all duration-300 no-underline"
              >
                <div className="text-electric group-hover:scale-110 transition-transform">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-text-secondary text-xs truncate max-w-full">
                  {link.label}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Footer Strip */}
        <footer className="border-t border-subtle pt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <div className="font-mono text-muted text-xs tracking-wider">
            © 2026 ADNAN MUSHTAQ LONE — ENGINEER // FOUNDER
          </div>
          <div className="font-mono text-muted text-xs tracking-widest uppercase flex items-center gap-2">
            <div className="w-1 h-1 bg-electric animate-pulse rounded-full" />
            Designed and built by <a href="https://www.linkedin.com/in/astrosalik-riyaz" target="_blank" rel="noopener noreferrer" className="text-electric hover:underline">Salik Riyaz</a>
          </div>
        </footer>
      </div>

      {/* Decorative UI elements */}
      <div className="absolute top-0 right-0 p-8 font-mono text-void text-8xl font-black opacity-30 select-none pointer-events-none hidden lg:block uppercase tracking-tighter">
        Terminal
      </div>
    </section>
  );
};

export default Contact;
