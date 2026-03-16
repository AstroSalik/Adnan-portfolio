# PRODUCT REQUIREMENTS DOCUMENT
## Adnan Mushtaq Lone — Personal Portfolio Website
**Platform:** Antigravity | **Version:** 1.0 | **Date:** 13 March 2026

---

## 1. Executive Summary

This document defines requirements for a personal portfolio website for Adnan Mushtaq Lone — a deep learning engineer, founder, and national award recipient from Kashmir. The site will be built using Antigravity and must be visually extraordinary: dark, cinematic, and technical in aesthetic, conveying the weight and innovation behind his work in AI, embedded systems, and computer vision.

The portfolio targets recruiters, research institutions, potential startup investors, and innovation ecosystem stakeholders. It must simultaneously feel like an engineering marvel and an artistic statement.

---

## 2. Subject Profile

### 2.1 Identity

- **Name:** Adnan Mushtaq Lone
- **Title:** Founder — tiwzz & CED | Deep Learning Engineer | Embedded Systems Expert
- **Location:** Kashmir, India
- **Domain:** AI/ML, Computer Vision, Embedded Systems (FPGA), Agricultural Tech, Bioacoustics

### 2.2 Core Expertise

- Convolutional Neural Networks (CNN)
- Camera Vision Technologies
- Machine Learning & Deep Learning
- Embedded Systems — FPGA
- Sensor Fusion & Signal Processing
- Real-time AI inference on edge hardware

### 2.3 Recognition & Awards

- 🏛 **Top 10 Nationally** — IIT Delhi Youth Ideathon (India-wide competition)
- 🇮🇳 **National Technology Week 2023** — Personal appreciation by Prime Minister Shri Narendra Modi
- 📰 **Indian Express feature** — Apple Grading System covered as innovation from Kashmir

### 2.4 Projects (10 total)

- Portable Apple Grading System (AI-based CNN + servo sorting)
- Walnut Sorting System (ML-based color/texture classification)
- Early Landslide Detection Model (sensor + ML predictive)
- Bird Recognition System (BirdNET AI on Raspberry Pi)
- WiFi CSI Human Detection System (passive RF sensing)
- ML-Guided Anti-Flare Missile Targeting Concept (IR + neural guidance)
- Autonomous Car Autopilot System (YOLO + LiDAR + GPS)
- Posture Control Smart Chair (sensor + biomechanics)
- Braille Learning Electronics Kit (assistive tech)
- Camera-Based Object Distance Measurement (OpenCV geometric)

---

## 3. Design System & Visual Direction

### 3.1 Aesthetic Philosophy

The portfolio should feel like entering a mission control room crossed with a cinematic sci-fi film. Dark, precise, layered — inspired by deep-space imagery and neural network visualisations. Every section should feel intentional, not decorative. The goal is **AWE**.

### 3.2 Color Palette

| Variable | Hex | Role |
|---|---|---|
| `--bg-void` | `#050816` | Deep background — near-black with blue tint |
| `--bg-panel` | `#0A0F2E` | Card/section backgrounds |
| `--accent-electric` | `#00D4FF` | Primary accent — electric cyan |
| `--accent-fire` | `#E94560` | Secondary accent — signal red/crimson |
| `--accent-gold` | `#F5A623` | Awards, highlights — amber gold |
| `--text-primary` | `#F0F4FF` | Main text — cool white |
| `--text-muted` | `#6B7FA3` | Secondary text, labels |
| `--border-glow` | `#1E3A5F` | Subtle borders with depth |

### 3.3 Typography

- **Display / Hero:** `Orbitron` (Google Fonts, 700/900) — geometric, futuristic, commanding
- **Body / Descriptions:** `IBM Plex Mono` — technical authenticity
- **Accent Labels / Tags:** `Rajdhani` or `Barlow Condensed` — condensed for density
- **Avoid:** Inter, Roboto, Arial, generic system fonts

### 3.4 Visual Motifs

- Neural network node graphs — animated SVG background or canvas
- Scanline / CRT texture overlays (subtle, hero only)
- Particle systems that react to mouse cursor
- Glitch text animation for name reveal
- Hex grid or circuit board pattern as section dividers
- Floating 3D device mockups or isometric chip illustrations for projects
- Data stream / binary rain (very subtle, behind content)

---

## 4. Site Architecture & Page Sections

### 4.1 Navigation

- Fixed top navigation bar — glassmorphism style (blurred backdrop)
- Logo: `AM` monogram or stylised `ADNAN` in Orbitron
- Nav links: Home, About, Awards, Expertise, Projects, Contact
- Scroll progress indicator — thin electric cyan line at top
- Mobile: hamburger menu with full-screen overlay

### 4.2 Section 01 — HERO

The hero is the most critical section. It must cause a moment of pause.

- Full viewport height
- Animated starfield or neural-network particle background (canvas-based)
- Glitch text entrance: `ADNAN MUSHTAQ LONE`
- Sub-headline types out: `Deep Learning Engineer | Founder | AI × Embedded Systems`
- Floating badge: `PM of India Award Recipient — 2023`
- CTA buttons: `View Projects` (electric cyan) + `Download CV` (ghost outline)
- Scroll indicator: pulsing down-arrow or animated chevron
- Optional: subtle photo — treated with duotone/glitch filter, not plain

### 4.3 Section 02 — IDENTITY / ABOUT

- Two-column layout: text left, visual element right
- Visual right: animated skill radar chart OR tech stack icon grid with hover glow
- Text: origin story — engineer from Kashmir solving real problems with AI
- Expertise tags: pill-shaped badges for CNN, OpenCV, TensorFlow, FPGA, Raspberry Pi, YOLO, LiDAR
- Subtle stat counters: `10 Projects` | `2 Major Awards` | `Top 10 India` | `2 Startups Founded`

### 4.4 Section 03 — AWARDS & RECOGNITION ⭐

> **Placement rationale:** Awards are positioned early — directly after the About section — to establish credibility before showcasing projects. Visitors need to understand *who is behind the work* before they engage with the work itself. Two PM-level recognitions are trust signals that should anchor the experience, not close it.

**Layout:** Vertical timeline, centered, with SVG line that draws itself on scroll.

**Node 1 — IIT Delhi:**
- Year badge: `2023` in Orbitron, gold
- Institution: `IIT Delhi` — Orbitron 700
- Achievement: `Youth Ideathon — Top 10 Nationally`
- Description: Competed against hundreds of student innovators from across India. The Apple Grading System earned recognition among the top 10 most impactful innovations at India's premier technology institute.
- Card styling: left border `--accent-gold`, background `--bg-panel`

**Node 2 — Prime Minister of India:**
- Year badge: `2023` in Orbitron, gold
- Institution: `National Technology Week` — Orbitron 700
- Achievement: `Personal Appreciation — PM Shri Narendra Modi`
- Description: During National Technology Week 2023, Adnan's work received direct recognition from the Prime Minister of India — an acknowledgement of its real-world impact and innovation from the northern frontier.
- Card styling: subtle tricolor gradient top border (saffron → white → green, 3px), background `--bg-panel`

**Media Coverage Card (full width, below timeline):**
- Newspaper treatment: `The Indian Express`
- Headline: `Students from Kashmir develop AI-powered Apple Grader for local farmers`
- Card style: white text on dark panel, left border `--accent-fire`, slight red glow

**Animate:** Timeline line draws downward on scroll using `SVG stroke-dashoffset` animation.

### 4.5 Section 04 — EXPERTISE

- Hexagonal grid layout (CSS clip-path hexagons)
- Each hex: domain name + icon + proficiency indicator
- Domains: Computer Vision | Deep Learning | Embedded Systems | Signal Processing | Autonomous Systems | Assistive Tech
- Hover state: hex expands to show tools/frameworks used
- Animate in on scroll — hexes drop in one by one with stagger

### 4.6 Section 05 — PROJECTS (Main Feature)

This is the showcase heart of the portfolio. 10 projects presented as **mission files**.

- **Layout:** Filterable card grid
- **Filters:** ALL | AGRICULTURE | AUTONOMOUS | DETECTION | DEFENCE | ASSISTIVE
- Each card: project number, codename-style title, one-line hook, tech stack tags, status badge
- Cards have 3D tilt effect on hover (CSS perspective transform)
- Expand/modal on click: full description, technical approach, outcome, tech used
- Featured projects (Apple Grader, Autonomous Car, Bird AI) get larger hero cards
- Card style: dark glass panel with electric-cyan border glow on hover

**Project Status Badges:**

| Badge | Color | Projects |
|---|---|---|
| `DEPLOYED` | Green | Apple Grader, Walnut Sorter, Bird AI, Distance Measurement |
| `PROTOTYPE` | Cyan | Autonomous Car, Smart Chair, Braille Kit, CSI Detection |
| `CONCEPT` | Red | Anti-Flare Missile, Landslide Model |

### 4.7 Section 06 — CONTACT

- Minimal — dark background, large centered text
- Headline: `Let's Build Something Impossible.`
- Email + LinkedIn + GitHub links with icon glyphs
- Optional: floating contact form with glassmorphism card
- Footer: copyright, built-with line

---

## 5. Interactions & Animation Spec

All animations implemented via **Framer Motion** — no GSAP, no vanilla JS IntersectionObserver.

- **Page load:** Hero text entrance via `motion.div` stagger — glitch fires on mount (600ms), settles clean
- **Scroll-triggered reveals:** `whileInView` + `viewport={{ once:true }}` — fade up `y:40→0`, `opacity:0→1`
- **Stagger children:** Framer Motion `variants` with `staggerChildren: 0.08` on container
- **Project cards:** `useSpring` 3D tilt (max 12°) with physics return on `mouseLeave` — `stiffness:200 damping:20`
- **Card hover:** `whileHover` — `translateY(-6px)` + `boxShadow` glow, border to electric cyan
- **Nav scroll progress:** `useScroll` → `scaleX` on a `motion.div` — no JS scroll listener needed
- **Award timeline:** `motion.line` with `pathLength: 0→1` on `whileInView` — draws itself on scroll
- **Stat counters:** `useCountUp` hook — `requestAnimationFrame` from 0 → target over 1500ms, triggered by `useInView`
- **Hex cards:** `whileInView` stagger-drop `y:-40→0` with 80ms delay per card
- **Project filter:** `AnimatePresence mode="popLayout"` — cards exit before new ones enter with `layout` animation
- **Modal:** `AnimatePresence` + spring entrance `y:60→0, scale:0.97→1` — `Escape` key + focus trap
- **Mobile nav:** `AnimatePresence` full-screen overlay — hamburger → X via `motion.div` rotate
- **Typewriter cursor:** `motion.span animate={{ opacity:[1,0,1] }}` infinite blink
- **Glitch recurrence:** CSS keyframes toggled by `setInterval` every 8s, lasts 150ms — `clip-path` slices + channel offsets
- **Reduced motion:** Particle canvas disabled entirely when `prefers-reduced-motion: reduce`

---

## 6. Technical Requirements (Antigravity)

### 6.1 Framework & Stack

- Platform: **Antigravity**
- Framework: **React 18** — component-per-section SPA architecture
- Animations: **Framer Motion** (`framer-motion ^11`) — all motion, scroll, spring, and presence
- Styling: **Tailwind CSS** — extended with custom design tokens
- Build tool: **Vite**
- Icons: **lucide-react** only — no Font Awesome, no other icon libraries
- **Do NOT use:** GSAP, jQuery, Bootstrap, or any vanilla JS animation approach

### 6.2 npm Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.383.0"
}
```

### 6.3 Project Structure

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── components/
│   ├── ParticleCanvas.jsx
│   ├── Navbar.jsx
│   ├── sections/        (Hero, About, Awards, Expertise, Projects, Contact)
│   └── ui/              (GlitchText, Typewriter, StatCard, ProjectCard, ProjectModal, HexCard, TimelineNode)
├── data/
│   ├── projects.js      (all 10 projects as JS objects)
│   └── expertise.js     (6 domain objects with lucide icon refs)
└── hooks/
    ├── useParticles.js   (canvas RAF loop, adaptive density, resize handler)
    └── useCountUp.js     (RAF count-up triggered by useInView)
```

### 6.4 Tailwind Config — Custom Tokens

```js
// tailwind.config.js
fontFamily: { orbitron, mono, rajdhani }
colors: { void, deep, panel, electric, fire, gold }
```

### 6.5 Performance Targets

- `React.memo` on `ProjectCard` and `HexCard`
- `useCallback` on filter, modal open/close, tilt handlers
- `loading="lazy"` on all images
- Particle canvas: adaptive density — 120 desktop / 60 tablet / 40 mobile
- Particle canvas disabled entirely on `prefers-reduced-motion: reduce`
- All text in real DOM elements — never canvas-rendered (SEO + accessibility)
- Target: Lighthouse performance > 85 on desktop

### 6.6 Responsiveness

| Breakpoint | Layout |
|---|---|
| 375px | 1 column, reduced particles, stacked hero, hamburger nav |
| 768px | 2 columns, tablet grid, mobile menu |
| 1280px | Full 3-column grid, side-by-side sections |
| 1920px | Max-width container centred |

### 6.7 Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section id="...">`, `<footer>`
- All section IDs: `#home`, `#about`, `#awards`, `#expertise`, `#projects`, `#contact`
- All interactive elements have `aria-label`
- Modal: focus trap + `Escape` key closes + focus returns on close
- `scroll-behavior: smooth` in `index.css`

---

## 7. Content & Copy Guidelines

- **Tone:** Confident, precise, understated — not boastful
- **Hero tagline example:** `Engineering Intelligence. From Kashmir to the World.`
- **Project descriptions:** Lead with the real-world problem, then the technical solution
- **Awards section:** Factual — let the institutions speak, no hyperbole needed
- **About section:** Human first — mention Kashmir origin as context, not limitation
- **Avoid:** "passionate about", "results-driven", "synergy" — all clichés

---

## 8. Page Section Order (Final)

```
01 → HERO
02 → ABOUT / IDENTITY
03 → AWARDS & RECOGNITION  ← moved up from Section 05
04 → EXPERTISE / TECH DOMAINS
05 → PROJECTS (Mission Files)
06 → CONTACT
```

---

## 9. Deliverables

- [x] Antigravity implementation prompt — React 18 + Framer Motion (complete)
- [x] PRD — this document (complete)
- [ ] Complete React 18 + Vite application built by Antigravity
- [ ] All 10 projects in `src/data/projects.js` with full data objects
- [ ] All 6 expertise domains in `src/data/expertise.js`
- [ ] All custom hooks: `useParticles.js`, `useCountUp.js`
- [ ] All UI components: GlitchText, Typewriter, StatCard, ProjectCard, ProjectModal, HexCard, TimelineNode
- [ ] Framer Motion animations on every section, card, modal, and interactive element
- [ ] Fully responsive at 375px, 768px, 1280px

---

*PRD prepared by Salik Riyaz for Adnan Mushtaq Lone Portfolio | React 18 + Framer Motion + Tailwind CSS | Antigravity Build | 15 March 2026*
