# ANTIGRAVITY IMPLEMENTATION PROMPT
## Adnan Mushtaq Lone — Personal Portfolio Website

> Paste this entire document into Antigravity to generate the portfolio. All specifications are self-contained.

---

You are an expert React developer building a visually extraordinary personal portfolio for Adnan Mushtaq Lone — a deep learning engineer, founder, and national award recipient from Kashmir, India.

Build a complete single-page portfolio as a **React 18 application** using **Framer Motion** for animations and **Tailwind CSS** for styling. This must be production-ready, visually stunning, and technically impressive. **Do not simplify. Do not hold back.**

---

## TECH STACK

```
React 18
Framer Motion
Tailwind CSS
Vite (build tool)
lucide-react (icons only)
```

**npm dependencies:**
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.383.0"
}
```

**Tailwind config** — extend with custom design tokens:
```js
// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      orbitron: ['Orbitron', 'sans-serif'],
      mono: ['IBM Plex Mono', 'monospace'],
      rajdhani: ['Rajdhani', 'sans-serif'],
    },
    colors: {
      void:      '#050816',
      deep:      '#080C24',
      panel:     '#0A0F2E',
      electric:  '#00D4FF',
      fire:      '#E94560',
      gold:      '#F5A623',
    }
  }
}
```

**Google Fonts** — import in `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=IBM+Plex+Mono:wght@400;500&family=Rajdhani:wght@500;600&display=swap');
```

**Do NOT use:** GSAP, jQuery, Bootstrap, Font Awesome, or any CSS framework other than Tailwind.

---

## PROJECT STRUCTURE

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── components/
│   ├── ParticleCanvas.jsx
│   ├── Navbar.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Awards.jsx
│   │   ├── Expertise.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   └── ui/
│       ├── GlitchText.jsx
│       ├── Typewriter.jsx
│       ├── StatCard.jsx
│       ├── ProjectCard.jsx
│       ├── ProjectModal.jsx
│       ├── HexCard.jsx
│       └── TimelineNode.jsx
├── data/
│   ├── projects.js
│   └── expertise.js
└── hooks/
    ├── useParticles.js
    └── useCountUp.js
```

---

## IDENTITY OF THE SUBJECT

- **Name:** Adnan Mushtaq Lone
- **Title:** Founder (tiwzz & CED) | Deep Learning Engineer | Embedded Systems Expert (FPGA)
- **Location:** Kashmir, India

**Core Expertise:**
- Convolutional Neural Networks (CNN)
- Camera Vision Technologies
- Machine Learning & Deep Learning
- Embedded Systems — FPGA
- Sensor Fusion, Signal Processing
- Real-time AI inference on edge hardware

**Awards:**
1. Top 10 Nationally — IIT Delhi Youth Ideathon
2. National Technology Week 2023 — Personal appreciation by Prime Minister of India, Shri Narendra Modi
3. Featured in The Indian Express for Apple Grading System (students from Kashmir solving real agricultural problems)

**Projects (10) — define in `src/data/projects.js`:**
1. **Portable Apple Grading System** — CNN trained on apple surface images to detect defects. Real-time camera processing, TensorFlow/Keras classification, servo-based mechanical sorting. Category: AGRICULTURE. Status: DEPLOYED. Stack: TensorFlow, Keras, OpenCV, Python, Servo Systems. Featured: true.
2. **Walnut Sorting System** — ML classification of walnuts by maturity using color-space transformation, texture analysis, OpenCV and Python. Category: AGRICULTURE. Status: DEPLOYED. Stack: OpenCV, Python, ML Classifier.
3. **Early Landslide Detection Model** — Predictive ML from environmental sensors (soil moisture, rainfall, terrain slope). Temporal pattern analysis for early warnings. Category: DETECTION. Status: CONCEPT. Stack: Python, Scikit-learn, Sensor Arrays.
4. **Bird Recognition System (BirdNET AI)** — Acoustic AI on Raspberry Pi. Spectrogram via Fourier transforms, deep neural network classification of bird species. Wildlife monitoring. Category: ASSISTIVE. Status: DEPLOYED. Stack: BirdNET, Raspberry Pi, Python, Audio HAT. Featured: true.
5. **WiFi CSI Human Detection** — Passive RF sensing using WiFi Channel State Information. ML analysis of Doppler shifts for non-intrusive human presence and breathing detection. Category: DETECTION. Status: PROTOTYPE. Stack: CSI Tools, Python, ML Models.
6. **ML-Guided Anti-Flare Missile Targeting Concept** — Conceptual IR signature classifier. Neural models distinguish aircraft from decoy flares using thermal decay patterns and sensor fusion. Category: DEFENCE. Status: CONCEPT. Stack: Neural Networks, IR Sensors, Sensor Fusion.
7. **Autonomous Car Autopilot System** — YOLO + LiDAR + GPS fusion. Object detection + depth sensing + serial control of servo actuators for steering, braking, acceleration. Category: AUTONOMOUS. Status: PROTOTYPE. Stack: YOLO, LiDAR, GPS, Python, Arduino. Featured: true.
8. **Posture Control Smart Chair** — Embedded pressure sensors detect spinal alignment. Real-time feedback system for ergonomic posture correction. Category: AUTONOMOUS. Status: PROTOTYPE. Stack: Pressure Sensors, Arduino, Embedded C.
9. **Braille Learning Electronics Kit** — Assistive educational device using microcontroller circuits, tactile outputs, and switches. Converts input to Braille dot patterns. Category: ASSISTIVE. Status: DEPLOYED. Stack: Arduino, Tactile Actuators, Embedded C.
10. **Camera-Based Object Distance Measurement** — OpenCV geometric depth estimation using focal length, pixel scaling, and object size analysis. Category: DETECTION. Status: DEPLOYED. Stack: OpenCV, Python, Camera Systems.

---

## DESIGN SYSTEM

**Aesthetic:** Dark cinematic mission-control meets neural network visualization. Think: a deep-space observatory crossed with a cutting-edge AI lab. Every pixel intentional.

### CSS Custom Properties — define in `index.css` `:root`:

```css
:root {
  --bg-void:         #050816;
  --bg-deep:         #080C24;
  --bg-panel:        #0A0F2E;
  --bg-glass:        rgba(10, 15, 46, 0.7);
  --accent-electric: #00D4FF;
  --accent-fire:     #E94560;
  --accent-gold:     #F5A623;
  --text-primary:    #F0F4FF;
  --text-secondary:  #A8B4D4;
  --text-muted:      #6B7FA3;
  --border-subtle:   #1E3A5F;
  --gradient-hero:   linear-gradient(135deg, #050816 0%, #0A0F2E 50%, #0F1B4D 100%);
}
```

### Typography

| Role | Font | Tailwind class |
|---|---|---|
| Display / Hero | Orbitron | `font-orbitron` |
| Technical / Body | IBM Plex Mono | `font-mono` |
| UI / Tags / Nav | Rajdhani | `font-rajdhani` |

- Hero h1: `text-[clamp(3rem,7vw,6.5rem)]`
- Section h2: `text-[clamp(2rem,4vw,3.5rem)]`
- **Never use:** Inter, Roboto, Arial, system-ui

---

## PARTICLE CANVAS — `ParticleCanvas.jsx`

Implement as a full-page fixed canvas behind all content:

```jsx
// useParticles.js hook handles:
// - Particle init: 120 desktop / 60 tablet / 40 mobile (window.innerWidth breakpoints)
// - Each particle: { x, y, vx, vy, radius: 1–3, opacity: 0.1–0.5, color: cyan or white }
// - requestAnimationFrame loop: drift particles, wrap at edges
// - Connection lines between particles within 120px (opacity = 1 - distance/120)
// - ResizeObserver resets particle count + canvas size

// ParticleCanvas.jsx:
// <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
// All page sections: relative z-10

// Respect prefers-reduced-motion:
// const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
// if (prefersReduced) return null
```

---

## NAVBAR — `Navbar.jsx`

```jsx
// Fixed top, h-[70px], backdrop-blur-xl bg-void/90
// Left: "AM" monogram — font-orbitron text-electric, thin 1px electric square border p-2
// Right: nav links ['Home','About','Awards','Expertise','Projects','Contact']
//   font-rajdhani font-semibold uppercase tracking-widest text-sm
//   active: text-electric border-b-2 border-electric
//   hover: text-electric transition-colors duration-200

// Framer Motion scroll progress bar:
// const { scrollYProgress } = useScroll()
// <motion.div style={{ scaleX: scrollYProgress }}
//   className="absolute top-0 left-0 h-[2px] w-full bg-electric origin-left" />

// Active section: useEffect + IntersectionObserver watching all section IDs
// setState on which section is intersecting > 50%

// Mobile <768px: useState menuOpen
// Hamburger: 3 lines → X via motion.div rotate transition
// AnimatePresence for full-screen overlay:
//   motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
//   fixed inset-0 bg-void z-50 flex flex-col items-center justify-center gap-8
//   Nav items stagger with variants staggerChildren: 0.08
```

---

## SECTION 01 — HERO — `Hero.jsx`

`min-h-screen`, background `var(--gradient-hero)`, particle canvas behind via z-index.

```jsx
// Layout: flex items-center justify-start pl-[8vw] pr-8 — left-biased on desktop
// Mobile: items-center justify-center text-center px-6

// 1. TOP LABEL — motion.p
//   initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
//   "// deep learning engineer & founder"
//   className="font-mono text-muted text-sm tracking-wider mb-4"

// 2. GLITCH NAME — <GlitchText /> component
//   Props: text="ADNAN MUSHTAQ LONE"
//   Implementation:
//     - Render name + two ::before/::after pseudo-elements via CSS (data-text attr)
//     - CSS class .glitch-active triggers @keyframes glitch-1 and glitch-2
//     - glitch-1: clip-path slices + translateX(-4px) with color #E94560 (red channel)
//     - glitch-2: clip-path slices + translateX(4px) with color #00D4FF (cyan channel)
//     - useEffect on mount: add .glitch-active for 600ms (entrance)
//     - setInterval every 8000ms: add .glitch-active for 150ms (recurrence)
//   className="font-orbitron font-black text-primary uppercase tracking-[0.05em]
//              text-[clamp(3rem,7vw,6.5rem)] leading-none mb-6"

// 3. TYPEWRITER — <Typewriter /> component
//   Props: phrases=['Convolutional Neural Networks','Computer Vision','Embedded AI Systems','Building from Kashmir']
//   Hook logic: useState for displayText + isDeleting + phraseIndex
//   useEffect: type 30ms/char → pause 1500ms → delete 15ms/char → next phrase → loop
//   Cursor: motion.span className="text-electric" animate={{ opacity:[1,0,1] }}
//           transition={{ repeat:Infinity, duration:0.8, times:[0,0.5,1] }}
//   className="font-mono text-electric text-[1.4rem] mb-8 h-8 block"

// 4. AWARD BADGES ROW — motion.div with stagger
//   variants: container staggerChildren 0.15, item: initial opacity:0 scale:0.8 → animate 1 1
//   Each badge: "🏛 IIT Delhi — Top 10 National" and "🇮🇳 PM of India Award 2023"
//   className="bg-electric/10 border border-electric font-rajdhani font-semibold
//              text-secondary text-sm px-4 py-2 inline-block"

// 5. CTA BUTTONS — motion.div flex gap-4 mt-8
//   <motion.button whileHover={{ y:-2 }} whileTap={{ scale:0.97 }}
//     transition={{ type:'spring', stiffness:400, damping:20 }}>
//   "VIEW PROJECTS": className="bg-electric text-void font-orbitron text-sm tracking-[0.15em]
//                               px-8 py-4 font-bold" — NO rounded corners
//   whileHover adds: boxShadow:'0 8px 24px rgba(0,212,255,0.35)'
//   "DOWNLOAD CV": className="border border-electric text-electric font-orbitron text-sm
//                              tracking-[0.15em] px-8 py-4 bg-transparent"
//   whileHover: backgroundColor:'rgba(0,212,255,0.08)'

// 6. SCROLL CHEVRON
//   Bottom center absolute
//   motion.div animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
//   ChevronDown icon from lucide-react, className="text-electric w-6 h-6 opacity-60"
```

---

## SECTION 02 — ABOUT — `About.jsx`

`bg-[var(--bg-deep)] py-[120px]`

```jsx
// const ref = useRef()
// const isInView = useInView(ref, { once: true, margin: '-100px' })

// TWO-COLUMN: className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 max-w-7xl mx-auto px-8"

// LEFT COLUMN:
//   Section label: motion.p "// 01 — ABOUT" font-mono text-electric text-sm tracking-widest
//   Headline: motion.h2 "Engineering AI That Solves Real Problems."
//     font-orbitron font-bold text-primary text-[clamp(1.8rem,3vw,2.8rem)] mb-8
//   initial={{ opacity:0, x:-40 }} animate={isInView ? {opacity:1,x:0} : {}}
//   transition={{ duration:0.7, ease:'easeOut' }}

//   Body (3 paragraphs): each motion.p staggered delay: index * 0.15
//   font-mono text-secondary leading-relaxed text-[0.95rem] mb-4

//   Skill tags: motion.div variants stagger
//   Each tag: motion.span whileHover={{ borderColor:'#00D4FF', color:'#00D4FF' }}
//   className="font-rajdhani text-sm bg-panel border border-[#1E3A5F] text-secondary
//              px-3 py-1 cursor-default transition-colors duration-200"

// RIGHT COLUMN — 2×2 stats grid:
//   <StatCard value="10" label="Projects" />
//   <StatCard value="02" label="Awards" />
//   <StatCard value="Top 10" label="India Rank" />
//   <StatCard value="02" label="Startups" />
//
//   StatCard: useCountUp(value, isInView) hook
//   useCountUp: useEffect — when isInView true, requestAnimationFrame from 0 → target over 1500ms
//   Card: className="bg-panel border-l-4 border-electric p-7"
//   Value: font-orbitron font-black text-5xl text-electric
//   Label: font-rajdhani uppercase tracking-widest text-muted text-sm mt-1
```

---

## SECTION 03 — AWARDS & RECOGNITION — `Awards.jsx`

> Awards placed here — directly after About — to anchor credibility before the technical showcase.

`bg-[var(--bg-void)] py-[120px]`

```jsx
// Section label: "// 02 — RECOGNITION" font-mono text-electric
// Headline: "Validated by India's Highest Institutions" font-orbitron

// ANIMATED SVG TIMELINE LINE:
// <svg className="absolute left-1/2 top-0 h-full" width="2">
//   <motion.line x1="1" y1="0" x2="1" y2="100%"
//     stroke="#00D4FF" strokeWidth="2"
//     initial={{ pathLength:0 }} whileInView={{ pathLength:1 }}
//     transition={{ duration:1.5, ease:'easeInOut' }}
//     viewport={{ once:true }} />
// </svg>

// TimelineNode.jsx — props: { year, institution, achievement, description, side, accentStyle }
// motion.div:
//   initial={{ opacity:0, x: side==='left' ? -60 : 60 }}
//   whileInView={{ opacity:1, x:0 }}
//   transition={{ duration:0.7, ease:'easeOut', delay:0.3 }}
//   viewport={{ once:true }}

// NODE 1 — IIT DELHI:
//   year="2023" institution="IIT Delhi" side="left"
//   achievement="Youth Ideathon — Top 10 Nationally"
//   description: full paragraph text
//   accentStyle: borderLeft: '4px solid #F5A623'
//   Year badge: font-orbitron text-gold font-bold

// NODE 2 — PM OF INDIA:
//   year="2023" institution="National Technology Week" side="right"
//   achievement="Personal Appreciation — PM Shri Narendra Modi"
//   description: full paragraph text
//   accentStyle: borderTop: '3px solid' + inline gradient (saffron/white/green via backgroundImage)
//   Implement tricolor border via:
//     style={{ borderImage: 'linear-gradient(90deg,#FF9933 33%,#ffffff 33%,#ffffff 66%,#138808 66%) 1' }}

// MEDIA COVERAGE CARD (full width, below timeline):
//   motion.div whileInView={{ opacity:1, y:0 }} initial={{ opacity:0, y:30 }}
//   whileHover={{ boxShadow:'0 0 30px rgba(233,69,96,0.2)' }}
//   className="bg-panel border-l-4 border-fire p-8 max-w-3xl mx-auto mt-16"
//   Masthead: "The Indian Express" — font-orbitron text-xs text-muted italic tracking-widest
//   Headline: font-mono text-primary text-lg leading-snug
//   Subtext: font-mono text-muted text-sm mt-2
```

---

## SECTION 04 — EXPERTISE — `Expertise.jsx`

`bg-[var(--bg-deep)] py-[100px]`

```jsx
// Section label: "// 03 — EXPERTISE" | Headline: "Core Technical Domains"

// HexCard.jsx — CSS clip-path hexagon
// Style: clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)
// Dimensions: w-[220px] h-[254px] (ratio 1:1.155 for regular hexagon)
// Background: bg-panel with radial gradient overlay on hover

// Honeycomb layout via CSS:
// Row 1 (3 items): normal
// Row 2 (3 items): translateX(110px) — offset by half hex width
// Use flex-wrap with negative margin-top: -mt-[32px] between rows

// motion.div per hex:
//   initial={{ opacity:0, y:-40 }}
//   whileInView={{ opacity:1, y:0 }}
//   transition={{ delay: index * 0.08, duration:0.5, ease:'easeOut' }}
//   viewport={{ once:true }}
//   whileHover={{ scale:1.06, boxShadow:'0 0 30px rgba(0,212,255,0.3)' }}

// Inside hex (all centered):
//   Icon: lucide-react w-10 h-10 text-electric mb-2
//   Domain: font-orbitron font-bold text-primary text-[0.85rem] text-center leading-tight
//   Tools: font-mono text-muted text-[0.65rem] text-center mt-1 px-4

// src/data/expertise.js domains:
// Eye → Computer Vision | Brain → Deep Learning | Cpu → Embedded Systems
// Radio → Signal Processing | Car → Autonomous Systems | Accessibility → Assistive Tech
```

---

## SECTION 05 — PROJECTS — `Projects.jsx`

`bg-[var(--bg-void)] py-[120px]`

```jsx
// Section label: "// 04 — PROJECTS" | Headline: "Mission Files"

// FILTER STATE: useState('ALL')
// Filter pills: ['ALL','AGRICULTURE','AUTONOMOUS','DETECTION','DEFENCE','ASSISTIVE']
// motion.button whileTap={{ scale:0.93 }}
// Active: bg-electric text-void font-bold
// Inactive: border border-electric/40 text-muted hover:border-electric/80
// Transition between states: layout animation via motion.div layout

// FILTERED CARDS:
// const filtered = activeFilter === 'ALL' ? projects : projects.filter(p => p.category === activeFilter)
// AnimatePresence mode="popLayout" for smooth card exits/entrances

// GRID: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6
// Featured cards: md:col-span-2 xl:col-span-2

// ProjectCard.jsx:
//   3D TILT via useSpring:
//   const rotateX = useSpring(0, { stiffness:200, damping:20 })
//   const rotateY = useSpring(0, { stiffness:200, damping:20 })
//   onMouseMove: calculate from cursor position relative to card rect
//   onMouseLeave: rotateX.set(0); rotateY.set(0)
//   <motion.div style={{ rotateX, rotateY, transformStyle:'preserve-3d' }}>

//   Card layout (className="bg-panel border border-[#1E3A5F] overflow-hidden relative flex flex-col"):
//   - Category color bar: h-[4px] w-full at top (category color map)
//   - Card number: absolute top-4 right-4, font-mono text-muted text-xs
//   - Status badge: absolute top-4 left-4, text-xs font-rajdhani font-bold px-2 py-0.5
//     DEPLOYED=bg-green-500/20 text-green-400 border border-green-500/40
//     PROTOTYPE=bg-electric/20 text-electric border border-electric/40
//     CONCEPT=bg-fire/20 text-fire border border-fire/40
//   - Title: font-orbitron font-bold text-primary mt-8 px-5
//   - Hook: font-mono text-secondary italic text-sm px-5 mt-2
//   - Tech tags: flex flex-wrap gap-1 px-5 mt-3
//     each: font-rajdhani text-xs bg-void border border-subtle text-muted px-2 py-0.5
//   - Footer: mt-auto px-5 pb-5 pt-4 border-t border-subtle
//     "OPEN FILE ↗" text-electric font-mono text-sm cursor-pointer
//     hover: text-electric/80

//   Card Framer Motion:
//   initial={{ opacity:0, y:30 }}
//   animate={{ opacity:1, y:0 }}
//   exit={{ opacity:0, scale:0.95 }}
//   transition={{ delay: index * 0.06 }}
//   whileHover: boxShadow:'0 20px 40px rgba(0,212,255,0.15)', borderColor:'#00D4FF'

// ProjectModal.jsx:
//   <AnimatePresence mode="wait">
//     {selectedProject && (
//       <motion.div key="backdrop" className="fixed inset-0 bg-void/95 backdrop-blur-md z-50"
//         initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
//         onClick={onClose}>
//         <motion.div key={selectedProject.id}
//           className="relative max-w-2xl mx-auto mt-[10vh] bg-panel border border-subtle p-8 overflow-y-auto max-h-[80vh]"
//           initial={{ opacity:0, y:60, scale:0.97 }}
//           animate={{ opacity:1, y:0, scale:1 }}
//           exit={{ opacity:0, y:40, scale:0.97 }}
//           transition={{ type:'spring', stiffness:300, damping:30 }}
//           onClick={e => e.stopPropagation()}>
//           // Close button + Escape key useEffect
//           // Category bar top strip
//           // Full title in font-orbitron
//           // Full description in font-mono text-secondary leading-relaxed
//           // Tech stack grid: each item bg-void border border-subtle font-mono text-electric text-sm px-3 py-1
//           // Status badge + Impact statement
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
//   useEffect: document.addEventListener('keydown', e => e.key==='Escape' && onClose())
//   Focus trap: useEffect moves focus to close button ref on mount
```

---

## SECTION 06 — CONTACT — `Contact.jsx`

`bg-[var(--bg-deep)] py-[140px]`

```jsx
// Center-aligned, max-w-4xl mx-auto px-8 text-center

// motion.p: "// 05 — CONTACT" font-mono text-muted text-sm tracking-widest mb-4
// motion.h2: "LET'S BUILD SOMETHING IMPOSSIBLE."
//   font-orbitron font-black text-primary text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-4
//   initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
// motion.p: subtitle font-mono text-secondary

// THREE CONTACT CARDS: grid grid-cols-1 md:grid-cols-3 gap-4 mt-12
// Each: motion.a whileHover={{ y:-4, borderColor:'#00D4FF' }}
//   className="bg-panel border border-subtle p-6 flex items-center gap-4 cursor-pointer
//              transition-colors duration-200 no-underline"
//   Icon: lucide-react w-6 h-6 text-electric (Mail / Linkedin / Github)
//   Label: font-mono text-secondary text-sm

// Data:
// { icon: Mail, label: 'adnan@tiwzz.com', href: 'mailto:adnan@tiwzz.com' }
// { icon: Linkedin, label: 'linkedin.com/in/adnanmushtaq', href: '#' }
// { icon: Github, label: 'github.com/adnanmushtaq', href: '#' }

// FOOTER: border-t border-subtle mt-20 pt-8 flex justify-between
// font-mono text-muted text-sm
// Left: "© 2026 Adnan Mushtaq Lone"
// Right: "Built with precision."
```

---

## FRAMER MOTION PATTERNS REFERENCE

```jsx
// STANDARD FADE UP (default for all sections):
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: 'easeOut' }}
viewport={{ once: true, margin: '-80px' }}

// STAGGER CHILDREN:
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// SCROLL PROGRESS BAR (Navbar):
const { scrollYProgress } = useScroll()
<motion.div style={{ scaleX: scrollYProgress }}
  className="absolute top-0 left-0 h-[2px] w-full bg-electric origin-left" />

// 3D CARD TILT (ProjectCard):
const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
const rotateY = useSpring(0, { stiffness: 200, damping: 20 })
// onMouseMove: rotateY.set((x - cx) / w * 20); rotateX.set(-(y - cy) / h * 20)
// onMouseLeave: rotateX.set(0); rotateY.set(0)

// MODAL (AnimatePresence):
<AnimatePresence mode="wait">
  {selectedProject && <ProjectModal key={selectedProject.id} ... />}
</AnimatePresence>

// TIMELINE LINE DRAW (SVG):
<motion.line
  initial={{ pathLength: 0, opacity: 0 }}
  whileInView={{ pathLength: 1, opacity: 1 }}
  transition={{ duration: 1.5, ease: 'easeInOut' }}
  viewport={{ once: true }} />

// TYPEWRITER CURSOR BLINK:
<motion.span
  animate={{ opacity: [1, 0, 1] }}
  transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.5, 1] }}>
  |
</motion.span>

// COUNT UP HOOK (useCountUp.js):
// useEffect — when isInView: raf loop from 0 → target over 1500ms using easeOut easing
// return displayValue (string, preserves 'Top 10' for non-numeric)

// GLITCH CSS KEYFRAMES (index.css):
@keyframes glitch-1 {
  0%   { clip-path: inset(20% 0 60% 0); transform: translateX(-4px); }
  25%  { clip-path: inset(60% 0 10% 0); transform: translateX(4px);  }
  75%  { clip-path: inset(40% 0 30% 0); transform: translateX(-2px); }
  100% { clip-path: inset(0 0 0 0);     transform: translateX(0);    }
}
@keyframes glitch-2 {
  0%   { clip-path: inset(50% 0 20% 0); transform: translateX(4px); color: #00D4FF; }
  50%  { clip-path: inset(10% 0 70% 0); transform: translateX(-4px);color: #E94560; }
  100% { clip-path: inset(0 0 0 0);     transform: translateX(0);   color: #F0F4FF; }
}
// .glitch-active::before { animation: glitch-1 150ms steps(1) forwards; color: #E94560; }
// .glitch-active::after  { animation: glitch-2 150ms steps(1) forwards; color: #00D4FF; }
// Both use content: attr(data-text); position: absolute; top:0; left:0; w-full;
```

---

## PERFORMANCE & ACCESSIBILITY

- `React.memo` on `ProjectCard` and `HexCard`
- `useCallback` on filter handler, modal open/close, and tilt handlers
- `loading="lazy"` on any `<img>` elements
- All interactive elements have `aria-label`
- Modal: `useEffect` moves focus to close button on open; `Escape` key closes
- Particle canvas: skip entirely if `prefers-reduced-motion: reduce`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section id="...">`, `<footer>`
- All section IDs: `#home`, `#about`, `#awards`, `#expertise`, `#projects`, `#contact`
- Smooth scroll: `html { scroll-behavior: smooth }` in `index.css`

---

## PAGE SECTION ORDER

```
App.jsx renders in this order:
<ParticleCanvas />       fixed background
<Navbar />               fixed top
<main>
  <Hero id="home" />
  <About id="about" />
  <Awards id="awards" />
  <Expertise id="expertise" />
  <Projects id="projects" />
  <Contact id="contact" />
</main>
```

---

## OUTPUT REQUIREMENTS

Produce a **complete, runnable React 18 + Vite application** with every file in the project structure above, including:

- `package.json` with all dependencies
- `vite.config.js` standard React + Tailwind setup
- `tailwind.config.js` with custom tokens
- `index.css` with Google Fonts + CSS variables + glitch keyframes + `scroll-behavior: smooth`
- `App.jsx` composing all sections
- All 6 section components fully built to spec
- All UI components: GlitchText, Typewriter, StatCard, ProjectCard, ProjectModal, HexCard, TimelineNode
- `src/data/projects.js` — all 10 projects as complete JS objects
- `src/data/expertise.js` — all 6 domain objects with lucide icon names
- `hooks/useParticles.js` — full canvas implementation
- `hooks/useCountUp.js` — count-up animation hook
- Framer Motion animations on every section, card, modal, and interactive element
- Fully responsive at 375px, 768px, 1280px
- Particle canvas adaptive density with prefers-reduced-motion guard

**This is a flagship portfolio. Execute at the highest possible quality. Do not cut corners. Make it extraordinary.**

---
you can also take reference from the image below:
![Reference Image](./Adnan-Portfolio-Reference.png)
![Adnan's picture](./Adnan-Portfolio-Adnan-Picture.png) 

*END OF PROMPT — Adnan Portfolio | React 18 + Framer Motion + Tailwind CSS | Designed and Built by Salik Riyaz | 15 March 2026*
