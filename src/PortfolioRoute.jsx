import Navbar from './layout/Navbar';
import ParticleCanvas from './layout/ParticleCanvas';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Awards from './components/sections/Awards';
import Expertise from './components/sections/Expertise';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function PortfolioRoute() {
  return (
    <div className="bg-void min-h-screen text-text-primary">
      <ParticleCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Awards />
        <Expertise />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default PortfolioRoute;
