# ANTIGRAVITY IMPLEMENTATION PROMPT
## Adnan Mushtaq Lone — Admin Dashboard / Command Portal

> Paste this entire document into Antigravity. All specifications are self-contained.

---

You are an expert React developer building a **personal admin dashboard** for Adnan Mushtaq Lone — a deep learning engineer and founder from Kashmir. This is his private command terminal: a tool he uses daily to manage his portfolio, track projects, log outreach, record recognition, and maintain a research journal.

**No backend. No API. No server.** Everything persists in `localStorage`. This must be production-ready, visually extraordinary, and operationally complete. **Do not simplify. Do not hold back.**

---

## TECH STACK

```
React 18
Framer Motion ^11
Tailwind CSS
Vite
lucide-react
@dnd-kit/core + @dnd-kit/sortable  (Kanban drag-drop)
marked  (markdown rendering)
```

**package.json dependencies:**
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.383.0",
  "@dnd-kit/core": "^6.0.0",
  "@dnd-kit/sortable": "^8.0.0",
  "marked": "^12.0.0"
}
```

**tailwind.config.js:**
```js
theme: {
  extend: {
    fontFamily: {
      orbitron: ['Orbitron', 'sans-serif'],
      mono: ['IBM Plex Mono', 'monospace'],
      rajdhani: ['Rajdhani', 'sans-serif'],
    },
    colors: {
      void:    '#050816',
      deep:    '#080C24',
      panel:   '#0A0F2E',
      input:   '#0D1435',
      hover:   '#111840',
      electric:'#00D4FF',
      fire:    '#E94560',
      gold:    '#F5A623',
      success: '#22C55E',
      purple:  '#A855F7',
    }
  }
}
```

**index.css:**
```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=IBM+Plex+Mono:wght@400;500&family=Rajdhani:wght@500;600&display=swap');

:root {
  --bg-void:         #050816;
  --bg-deep:         #080C24;
  --bg-panel:        #0A0F2E;
  --bg-input:        #0D1435;
  --bg-hover:        #111840;
  --accent-electric: #00D4FF;
  --accent-fire:     #E94560;
  --accent-gold:     #F5A623;
  --accent-green:    #22C55E;
  --accent-purple:   #A855F7;
  --text-primary:    #F0F4FF;
  --text-secondary:  #A8B4D4;
  --text-muted:      #6B7FA3;
  --border-subtle:   #1E3A5F;
  --border-active:   #00D4FF;
}

html { scroll-behavior: smooth; }
body { background: var(--bg-void); color: var(--text-primary); font-family: 'IBM Plex Mono', monospace; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-void); }
::-webkit-scrollbar-thumb { background: var(--border-subtle); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent-electric); }
```

---

## PROJECT STRUCTURE

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── auth/
│   └── PassphraseGate.jsx
├── layout/
│   ├── Sidebar.jsx
│   ├── TopBar.jsx
│   └── ToastProvider.jsx
├── modules/
│   ├── Overview/
│   │   ├── Overview.jsx
│   │   ├── StatCard.jsx
│   │   └── ActivityFeed.jsx
│   ├── PortfolioCMS/
│   │   ├── PortfolioCMS.jsx
│   │   ├── ProjectsTable.jsx
│   │   ├── ProjectForm.jsx
│   │   └── ProfileEditor.jsx
│   ├── ProjectTracker/
│   │   ├── ProjectTracker.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── KanbanColumn.jsx
│   │   └── KanbanCard.jsx
│   ├── OutreachLog/
│   │   ├── OutreachLog.jsx
│   │   ├── OutreachTable.jsx
│   │   └── OutreachForm.jsx
│   ├── RecognitionWall/
│   │   ├── RecognitionWall.jsx
│   │   ├── RecognitionGrid.jsx
│   │   └── RecognitionForm.jsx
│   └── LabJournal/
│       ├── LabJournal.jsx
│       ├── EntryList.jsx
│       ├── EntryEditor.jsx
│       └── MarkdownPreview.jsx
├── components/
│   ├── Drawer.jsx
│   ├── Modal.jsx
│   ├── ConfirmModal.jsx
│   ├── Toast.jsx
│   ├── TagInput.jsx
│   └── Badge.jsx
├── hooks/
│   ├── useLocalStorage.js
│   ├── useToast.js
│   ├── useActivity.js
│   └── useCountUp.js
└── data/
    └── seeds.js
```

---

## DATA LAYER — `hooks/useLocalStorage.js`

```js
// Thin localStorage utility — ALL modules use this, never raw localStorage calls

const KEYS = {
  AUTH:        'adnan_auth',        // sessionStorage
  PROJECTS:    'adnan_projects',
  PROFILE:     'adnan_profile',
  OUTREACH:    'adnan_outreach',
  RECOGNITION: 'adnan_recognition',
  JOURNAL:     'adnan_journal',
  ACTIVITY:    'adnan_activity',
}

// storage.get(key) → parsed array/object or default
// storage.set(key, value) → stringify + setItem
// storage.add(key, item) → get array, push { ...item, id: nanoid(), createdAt: Date.now() }, set
// storage.update(key, id, patch) → map over array, merge matching id
// storage.delete(key, id) → filter out matching id
// storage.export() → downloads all keys as JSON file: adnan_export_[timestamp].json
// storage.import(jsonString) → parses + restores all keys

// useLocalStorage(key, defaultValue) hook:
// const [value, setValue] = useLocalStorage('adnan_projects', [])
// Returns [value, setter] where setter auto-persists to localStorage
```

**Seed data in `src/data/seeds.js`** — pre-load on first run if localStorage empty:

```js
// 10 projects pre-seeded with all fields
// 2 recognition entries (IIT Delhi + PM Award)
// 1 sample journal entry
// 0 outreach entries (starts empty)
// Profile: Adnan's bio, skills, contact info
```

---

## AUTH — `PassphraseGate.jsx`

```jsx
// Full-screen dark overlay shown before dashboard
// sessionStorage key 'adnan_auth' === 'true' → skip gate, show dashboard

// Layout: centered card, bg-panel, border border-subtle, p-12
// Top: "AM" monogram — font-orbitron text-5xl text-electric, thin square border
// Label: "// COMMAND TERMINAL" font-mono text-muted text-xs tracking-widest mt-4
// Headline: "ENTER PASSPHRASE" font-orbitron text-2xl text-primary mt-8

// Input: type="password", font-mono, bg-input border border-subtle
//   focus: border-electric outline-none ring-0
//   placeholder: "________________"

// Button: "ENTER TERMINAL" — bg-electric text-void font-orbitron tracking-widest
//   full width, py-3, no border-radius (sharp corners)
//   whileHover: { opacity:0.9 } whileTap: { scale:0.98 }

// Hardcoded passphrase check: if (input === 'adnan2026')
//   → sessionStorage.setItem('adnan_auth', 'true')
//   → Framer Motion: overlay animates out (opacity:0, scale:1.02, duration:0.4)
//   → dashboard fades in

// Wrong passphrase:
//   → motion.div animate={{ x:[0,-12,12,-12,12,-6,6,0] }} transition={{ duration:0.4 }}
//   → input border transitions to --accent-fire
//   → small error text: "// ACCESS DENIED" in font-mono text-fire text-xs fades in

// Framer Motion entrance: gate itself fades in on mount
// initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}
```

---

## LAYOUT — `Sidebar.jsx`

```jsx
// Fixed left sidebar, w-[260px], h-screen, bg-deep, border-r border-subtle
// flex flex-col

// TOP: Logo area (h-[70px] flex items-center px-6)
//   "AM" in font-orbitron text-xl text-electric
//   + "COMMAND PORTAL" font-mono text-muted text-[0.6rem] tracking-widest ml-3

// MIDDLE: Nav items (flex-1, py-6)
// Section label: "// MODULES" font-mono text-muted text-[0.65rem] tracking-widest px-6 mb-3

// Nav item structure:
// <motion.button layoutId not needed — use active indicator with layoutId="activeNav">
// Each item: flex items-center gap-3 px-6 py-3 w-full relative
// Active: bg-hover, left border 3px electric, text-electric
//   Active indicator: motion.div layoutId="sidebar-active"
//   position: absolute left-0 top-0 h-full w-[3px] bg-electric
//   animate between items with Framer Motion layoutId (smooth slide)
// Inactive: text-secondary hover:text-primary hover:bg-hover/50
// Icon: lucide-react w-4 h-4
// Label: font-rajdhani font-semibold text-sm uppercase tracking-wide
// Badge (if applicable): ml-auto bg-electric/20 text-electric text-xs font-mono px-1.5 py-0.5

// Nav items:
// { icon: LayoutDashboard, label: 'Overview',       id: 'overview' }
// { icon: FileCode2,       label: 'Portfolio CMS',  id: 'cms' }
// { icon: Columns,         label: 'Project Tracker',id: 'tracker' }
// { icon: Send,            label: 'Outreach Log',   id: 'outreach' }
// { icon: Star,            label: 'Recognition',    id: 'recognition' }
// { icon: BookOpen,        label: 'Lab Journal',    id: 'journal' }

// BOTTOM: System items (pb-6)
// Section label: "// SYSTEM"
// { icon: Download,  label: 'Export Data',  onClick: storage.export }
// { icon: Lock,      label: 'Lock',         onClick: handleLock }
// Lock: clears sessionStorage, AnimatePresence back to PassphraseGate

// Tablet <1024px: sidebar collapses to w-[56px] icon-only
// Toggle button at bottom of sidebar
// Tooltip on hover showing label (motion.div, absolute left-full)
```

---

## LAYOUT — `TopBar.jsx`

```jsx
// Fixed top bar (but only within main content area, not over sidebar)
// h-[60px] bg-deep/80 backdrop-blur-md border-b border-subtle
// flex items-center justify-between px-8

// LEFT: Current module title
// font-orbitron text-lg text-primary
// Prefix: "// " in text-electric

// RIGHT: flex items-center gap-4
// Quick action button (context-sensitive per module):
//   Portfolio CMS → "+ Add Project"
//   Outreach → "+ Log Entry"
//   Recognition → "+ Add Award"
//   Journal → "+ New Note"
//   Others → nothing
// Button: border border-electric text-electric font-rajdhani text-sm px-4 py-1.5
//   whileHover: bg-electric/10

// Separator (1px vertical line, border-subtle)

// User monogram: "AM" in font-orbitron text-sm text-void bg-electric w-8 h-8 flex items-center justify-center
```

---

## LAYOUT — `ToastProvider.jsx`

```jsx
// Global toast system via React Context
// useToast() hook: { addToast } → addToast({ type, message })

// Toast types: 'success' | 'error' | 'warning' | 'info'
// Colors: success=green, error=fire, warning=gold, info=electric

// Toast container: fixed top-4 right-4 z-50 flex flex-col gap-2

// Each toast: motion.div
//   initial={{ opacity:0, x:60, scale:0.95 }}
//   animate={{ opacity:1, x:0, scale:1 }}
//   exit={{ opacity:0, x:60, scale:0.95 }}
//   transition={{ type:'spring', stiffness:300, damping:25 }}
// Auto-dismiss after 3000ms via useEffect setTimeout

// Toast layout: flex items-center gap-3 bg-panel border-l-4 [type color] px-4 py-3
// Icon (lucide): CheckCircle / XCircle / AlertTriangle / Info — type color
// Message: font-mono text-primary text-sm
// Close ×: ml-auto text-muted hover:text-primary cursor-pointer
```

---

## MODULE 00 — OVERVIEW — `Overview.jsx`

```jsx
// Dashboard home screen

// STAT CARDS ROW (grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8)
// StatCard props: { label, value, icon, color }
// Cards:
// { label:'Total Projects',  value: projects.length,     icon: FolderKanban, color:'electric' }
// { label:'Deployed',        value: deployed.length,     icon: Rocket,       color:'success'  }
// { label:'Outreach Entries',value: outreach.length,     icon: Send,         color:'electric' }
// { label:'Awards Logged',   value: recognition.length,  icon: Star,         color:'gold'     }
// { label:'Journal Entries', value: journal.length,      icon: BookOpen,     color:'purple'   }
// { label:'Follow-ups Due',  value: overdue.length,      icon: AlertCircle,  color:'fire'     }

// StatCard component:
// bg-panel border border-subtle p-5
// Icon: w-8 h-8 text-[color] mb-3
// Value: font-orbitron font-black text-4xl text-[color] (useCountUp hook)
// Label: font-mono text-muted text-xs uppercase tracking-widest mt-1
// whileHover: { y:-2, borderColor:'#00D4FF' }

// TWO COLUMN GRID (grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6)

// LEFT — ACTIVITY FEED (ActivityFeed.jsx):
// Title: "// RECENT ACTIVITY" font-mono text-electric text-xs tracking-widest mb-4
// List of last 10 activity entries from 'adnan_activity'
// Each entry: flex items-start gap-3
//   Left border color by module (electric/gold/green/purple/fire)
//   Module tag: font-rajdhani text-xs uppercase badge
//   Description: font-mono text-secondary text-sm
//   Timestamp: font-mono text-muted text-xs ml-auto (e.g. "2h ago")
// motion.div stagger children on mount: staggerChildren 0.05

// RIGHT — QUICK ACTIONS:
// Title: "// QUICK ACTIONS" font-mono text-electric text-xs tracking-widest mb-4
// 4 action buttons (vertical stack):
// Each: motion.button whileHover={{ x:4, borderColor:'#00D4FF' }}
//   flex items-center gap-3 w-full bg-panel border border-subtle px-4 py-3 text-left
//   Icon: lucide, text-electric
//   Label: font-rajdhani font-semibold text-secondary text-sm
//   Arrow: ChevronRight ml-auto text-muted
// Actions:
// { icon: Plus,      label: '+ New Project',    onClick: () => navigate('cms') + openDrawer() }
// { icon: Send,      label: '+ Log Outreach',   onClick: () => navigate('outreach') + openForm() }
// { icon: Star,      label: '+ Add Award',      onClick: () => navigate('recognition') + openForm() }
// { icon: PenLine,   label: '+ New Note',       onClick: () => navigate('journal') + newEntry() }
```

---

## MODULE 01 — PORTFOLIO CMS — `PortfolioCMS.jsx`

```jsx
// Two tabs: "PROJECTS" and "PROFILE"
// Tab bar: font-rajdhani uppercase tracking-widest text-sm
// Active tab: border-b-2 border-electric text-electric
// Inactive: text-muted hover:text-secondary

// ── PROJECTS TAB ── ProjectsTable.jsx

// Filter bar (flex gap-3 mb-6):
//   Search input: placeholder="// search projects..." font-mono bg-input border border-subtle
//   Category select: ALL / AGRICULTURE / AUTONOMOUS / DETECTION / DEFENCE / ASSISTIVE
//   Status select: ALL / CONCEPT / PROTOTYPE / DEPLOYED
//   "+ Add Project" button: bg-electric text-void font-rajdhani font-bold px-4 py-2

// Table (w-full):
// Header row: font-mono text-muted text-xs uppercase tracking-widest bg-deep
// Columns: # | TITLE | CATEGORY | STATUS | FEATURED | UPDATED | ACTIONS
// Each row:
//   font-mono text-secondary text-sm
//   hover: bg-hover transition-colors
//   # col: text-electric text-xs
//   TITLE: text-primary font-semibold cursor-pointer (click to expand)
//   CATEGORY: <Badge> colored pill
//   STATUS: <Badge> DEPLOYED=green / PROTOTYPE=electric / CONCEPT=fire
//   FEATURED: Toggle switch (electric when on, subtle when off)
//   UPDATED: text-muted text-xs (relative time)
//   ACTIONS: Edit (Pencil icon, text-electric) | Delete (Trash2, text-fire)
// Row expand: AnimatePresence — description text fades in below row

// ProjectForm.jsx (Drawer):
// Slide-in drawer from right — Drawer.jsx component
// Title: "// NEW PROJECT" or "// EDIT PROJECT"
// Fields (all styled: bg-input border border-subtle font-mono text-primary):
//   Title * — text input
//   Hook * — text input (max 120 chars, live counter)
//   Description * — textarea rows=6 (markdown supported)
//   Category * — styled select
//   Status * — styled select
//   Tech Stack — TagInput component (add chip on Enter/comma, × to remove)
//   Featured — toggle switch
// Validation: required fields get border-fire + "// required" label on submit attempt
// Save: storage.add/update → addToast success → close drawer → log activity
// Cancel: confirms if form dirty (has unsaved changes)

// ── PROFILE TAB ── ProfileEditor.jsx

// Sections:
// "ABOUT TEXT" — 3 textareas (paragraph 1, 2, 3) with live char count
// "SKILL TAGS" — TagInput showing current tags, editable
// "CONTACT LINKS" — 3 inputs: Email, LinkedIn URL, GitHub URL
// "HERO TAGLINE" — single text input
// Save All button: bg-electric text-void font-rajdhani font-bold
//   On save: Framer Motion pulse (scale 1→1.05→1), success toast
```

---

## MODULE 02 — PROJECT TRACKER — `ProjectTracker.jsx`

```jsx
// Full Kanban board using @dnd-kit

// KanbanBoard.jsx:
// <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
// grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4

// COLUMNS: CONCEPT | IN PROGRESS | PROTOTYPE | DEPLOYED
// Column colors: CONCEPT=#6B7FA3(muted), IN_PROGRESS=#00D4FF, PROTOTYPE=#F5A623, DEPLOYED=#22C55E

// KanbanColumn.jsx:
// bg-panel border border-subtle flex flex-col min-h-[500px]
// Header: flex justify-between items-center p-4 border-b border-subtle
//   Title: font-orbitron text-sm font-bold text-[column color]
//   Count badge: bg-[color]/20 text-[color] font-mono text-xs px-2 py-0.5
// Body: <SortableContext> droppable area, p-3 flex flex-col gap-3 flex-1
// Footer: "+ Add" button — font-mono text-muted text-xs hover:text-electric
//   Opens inline mini-form: just Title + Stack fields, status = column status

// KanbanCard.jsx (SortableItem):
// <useSortable id={project.id}>
// bg-hover border border-subtle p-4 cursor-grab active:cursor-grabbing
// Drag state: opacity-80, boxShadow: 0 20px 40px rgba(0,212,255,0.2), rotate: 1.5deg
//   (use transform + Framer Motion style for drag visual)

// Card layout:
//   Top row: category <Badge> + project number (font-mono text-muted text-xs, ml-auto)
//   Title: font-orbitron text-sm font-bold text-primary mt-2
//   Stack tags: flex flex-wrap gap-1 mt-2 (show max 3, "+N more" badge if overflow)
//   Footer: font-mono text-muted text-[0.65rem] flex justify-between mt-3
//     Last updated | GripVertical icon (drag handle visual)

// handleDragEnd:
//   Identify source column (current status) + destination column
//   storage.update('adnan_projects', id, { status: destColumn })
//   addToast({ type:'success', message:`// ${project.title} → ${destColumn}` })
//   logActivity('tracker', `Moved "${project.title}" to ${destColumn}`)
```

---

## MODULE 03 — OUTREACH LOG — `OutreachLog.jsx`

```jsx
// Full outreach tracking table

// Top bar: filter controls + "+ Log Entry" button

// FILTER BAR (flex flex-wrap gap-3 mb-6):
//   Search: text input font-mono bg-input border border-subtle
//   Type filter: ALL / RESEARCH / SPEAKING / APPLICATION / PARTNERSHIP / MEDIA / OTHER
//   Status filter: ALL / DRAFT / SENT / REPLIED / IN PROGRESS / CLOSED WON / CLOSED LOST
//   Date range: from/to date inputs (styled, bg-input)

// OVERDUE ALERT (if overdue.length > 0):
// motion.div: bg-gold/10 border border-gold px-4 py-3 mb-4
// AlertTriangle icon text-gold + "// {n} follow-up(s) overdue" font-mono text-gold text-sm
// Lists overdue entries inline

// TABLE:
// Columns: DATE | TYPE | ORGANISATION | DESCRIPTION | STATUS | FOLLOW-UP | ACTIONS
// Status badge colors:
//   DRAFT: muted | SENT: electric | REPLIED: gold
//   IN PROGRESS: green | CLOSED WON: bright green | CLOSED LOST: fire muted
// Follow-up: if date past → text-gold, if future → text-muted
// Overdue row: bg-gold/5 border-l-2 border-gold

// Row actions: Edit (Pencil, text-electric) | Delete (Trash2, text-fire)
// Row hover: bg-hover
// Empty state: centered illustration text "// No entries yet. Start logging." font-mono text-muted

// OutreachForm.jsx (Drawer):
// Fields:
//   Date * — date input
//   Type * — select
//   Organisation / Contact * — text input
//   Description * — textarea rows=3
//   Status * — select (default: DRAFT)
//   Notes — textarea rows=2
//   Follow-up Date — date input (optional)
// On save: storage.add → toast → logActivity
```

---

## MODULE 04 — RECOGNITION WALL — `RecognitionWall.jsx`

```jsx
// Grid of recognition cards + add form

// Top bar: Type filter + Sort (newest/oldest) + "+ Add Award" button

// RecognitionGrid.jsx:
// grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5
// AnimatePresence for entries with stagger

// Recognition card:
// bg-panel border border-subtle overflow-hidden
// Type-based accent:
//   AWARD: border-t-2 border-gold, gold glow on hover
//   PRESS: border-l-4 border-fire
//   COMMENDATION: border-t-2 border-electric
//   COMPETITION: border-l-4 border-purple
//   FEATURE: border-t-2 border-success

// Card layout:
//   Top: Type <Badge> + Date (font-mono text-muted text-xs, ml-auto)
//   Institution: font-orbitron font-bold text-primary mt-3 text-sm
//   Achievement: font-mono text-secondary text-sm mt-1
//   Description: font-mono text-muted text-xs mt-3 line-clamp-3
//   Image (if uploaded): w-full h-32 object-cover mt-3 (base64 src)
//   Footer: flex gap-3 mt-4 pt-3 border-t border-subtle
//     URL link (if present): ExternalLink icon text-electric text-xs
//     "Show on Portfolio" toggle: small toggle switch
//     Edit + Delete actions

// motion.div:
//   initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
//   whileHover: { y:-4, boxShadow: type-specific glow }

// RecognitionForm.jsx (Drawer):
// Fields:
//   Type * — select: AWARD / PRESS / FEATURE / COMMENDATION / COMPETITION
//   Institution / Source *
//   Achievement Title *
//   Date *
//   Description — textarea
//   URL — text input (https://...)
//   Upload Image — file input → convert to base64 → store
//   Show on Portfolio — toggle (default: true)
```

---

## MODULE 05 — LAB JOURNAL — `LabJournal.jsx`

```jsx
// Split-pane layout: entry list left + editor right

// LAYOUT: grid grid-cols-[280px_1fr] h-[calc(100vh-60px)] (fills remaining viewport)
// Left pane: bg-deep border-r border-subtle overflow-y-auto
// Right pane: bg-void flex flex-col

// EntryList.jsx (left pane):
// Search bar: font-mono bg-input border-b border-subtle px-4 py-3 w-full
//   placeholder="// search journal..."
// Tag filters: flex flex-wrap gap-1 px-3 py-2 border-b border-subtle
//   Suggested tags as small pills, click to filter
// Entry items:
//   Each: px-4 py-3 border-b border-subtle cursor-pointer
//   Active: bg-hover border-l-2 border-purple text-primary
//   Inactive: text-secondary hover:bg-hover/50
//   Title: font-mono text-sm font-medium (truncated)
//   Date: font-mono text-muted text-xs
//   Tags: flex gap-1 mt-1 — each tag: bg-purple/10 text-purple text-xs px-1.5 py-0.5 font-mono
//   Empty snippet: text-muted text-xs mt-1 line-clamp-1
// "+ New Entry" button: sticky bottom of pane
//   bg-purple text-void font-rajdhani font-bold w-full py-3

// EntryEditor.jsx (right pane):
// Top bar: flex items-center justify-between border-b border-subtle px-6 py-3
//   Title input: font-orbitron text-xl bg-transparent border-none outline-none text-primary
//     placeholder="// entry title..."
//   Right: EDIT | PREVIEW toggle tabs + "// saved" autosave indicator (motion.span fadeIn/out)
//   Actions: Duplicate | Export .md | Delete

// Tags input row: px-6 py-3 border-b border-subtle
//   TagInput component with purple accent (add on Enter, × to remove)
//   Suggested tags as clickable chips beside input

// Editor body (flex-1):
//   EDIT mode: textarea — font-mono text-secondary text-sm leading-relaxed
//     bg-transparent border-none outline-none resize-none w-full h-full p-6
//     placeholder="// start writing..."
//   PREVIEW mode: MarkdownPreview.jsx
//     prose rendering with custom dark theme styles
//     font-mono for code blocks, text-primary headings, text-secondary body

// Auto-save: useEffect debounce 800ms on body/title/tags change
//   → storage.update('adnan_journal', id, { title, body, tags, updatedAt })
//   → show "// saved" indicator (opacity 0→1→0 animation, 1.5s)

// Export .md: creates Blob with entry content, triggers download
//   filename: `${slugify(title)}_${date}.md`

// MarkdownPreview.jsx:
//   dangerouslySetInnerHTML={{ __html: marked.parse(body) }}
//   Custom CSS classes for markdown elements in index.css:
//     .md-preview h1,h2,h3: font-orbitron, text-primary
//     .md-preview p: font-mono text-secondary leading-relaxed
//     .md-preview code: bg-panel text-electric px-1 rounded
//     .md-preview pre: bg-panel border border-subtle p-4 overflow-x-auto
//     .md-preview a: text-electric hover:underline
//     .md-preview blockquote: border-l-4 border-electric pl-4 text-muted italic
//     .md-preview ul,ol: text-secondary font-mono pl-6
```

---

## SHARED COMPONENTS

### `Drawer.jsx`
```jsx
// Slide-in panel from right — used by all form contexts
// Backdrop: motion.div fixed inset-0 bg-void/80 backdrop-blur-sm z-40
//   initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
//   onClick: close if form not dirty
// Panel: motion.div fixed right-0 top-0 h-full w-[480px] bg-deep border-l border-subtle z-50
//   initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
//   transition={{ type:'spring', stiffness:300, damping:30 }}
// Header: border-b border-subtle px-6 py-4 flex justify-between items-center
//   Title slot + X close button (text-muted hover:text-fire)
// Body: overflow-y-auto flex-1 px-6 py-6
// Footer: border-t border-subtle px-6 py-4 flex gap-3 justify-end
//   Cancel: ghost border border-subtle text-muted
//   Save: bg-electric text-void font-rajdhani font-bold
//   Both: whileHover + whileTap spring animations
```

### `ConfirmModal.jsx`
```jsx
// Confirmation dialog for destructive actions
// AnimatePresence wrapper
// Backdrop: fixed inset-0 bg-void/90 backdrop-blur-sm z-50
// Modal: motion.div centered max-w-sm bg-panel border border-subtle p-8
//   initial={{ opacity:0, scale:0.95, y:20 }}
//   animate={{ opacity:1, scale:1, y:0 }}
//   transition: spring stiffness:400 damping:30
// Icon: AlertTriangle w-10 h-10 text-fire mx-auto mb-4
// Title: font-orbitron text-lg text-primary text-center
// Message: font-mono text-secondary text-sm text-center mt-2
// Buttons: flex gap-3 mt-6
//   Cancel: flex-1 border border-subtle text-muted hover:text-primary
//   Confirm: flex-1 bg-fire text-void font-rajdhani font-bold
//     whileHover: { scale:1.02 } whileTap: { scale:0.98 }
```

### `TagInput.jsx`
```jsx
// Reusable tag chip input
// Props: { tags, onChange, suggestions?, accentColor? }
// Renders existing tags as chips with × remove button
// Input field: type on comma or Enter to add new tag
// accentColor prop controls chip border/text color (default: electric)
// Chip: font-mono text-xs bg-[color]/10 border border-[color]/40 text-[color] px-2 py-0.5
// × button: hover:text-fire
// motion.div for each chip: initial scale:0 → scale:1 spring entrance
```

### `Badge.jsx`
```jsx
// Colored status/category badge
// Props: { label, type }
// type → color mapping:
//   AGRICULTURE: green | AUTONOMOUS: electric | DETECTION: gold
//   DEFENCE: fire | ASSISTIVE: purple
//   DEPLOYED: green | PROTOTYPE: electric | CONCEPT: fire/muted
//   AWARD: gold | PRESS: fire | COMMENDATION: electric | COMPETITION: purple
// font-rajdhani font-bold text-xs uppercase px-2 py-0.5
// bg-[color]/15 border border-[color]/40 text-[color]
```

---

## HOOKS

### `useActivity.js`
```js
// logActivity(module, description) → prepends to 'adnan_activity' array
// Keeps max 50 entries (slice)
// Entry: { id, module, description, timestamp: Date.now() }
// Module colors: cms=electric, tracker=gold, outreach=success, recognition=gold, journal=purple
// getRelativeTime(timestamp) → "2h ago", "3d ago", "just now"
```

### `useCountUp.js`
```js
// useCountUp(target, isActive) → displayValue
// requestAnimationFrame from 0 → target over 1000ms with easeOut
// Handles non-numeric values ('Top 10') → returns as-is
```

### `useToast.js`
```js
// Context + hook for global toast system
// addToast({ type: 'success'|'error'|'warning'|'info', message: string })
// Auto-generates id, auto-removes after 3000ms
// Returns { toasts, addToast, removeToast }
```

---

## FRAMER MOTION PATTERNS

```jsx
// MODULE TRANSITION (AnimatePresence in App.jsx):
// <AnimatePresence mode="wait">
//   <motion.div key={activeModule}
//     initial={{ opacity:0, x:20 }}
//     animate={{ opacity:1, x:0 }}
//     exit={{ opacity:0, x:-20 }}
//     transition={{ duration:0.2, ease:'easeOut' }}>
//     <ActiveModule />
//   </motion.div>
// </AnimatePresence>

// SIDEBAR ACTIVE INDICATOR (layoutId slide):
// <motion.div layoutId="sidebar-active"
//   className="absolute left-0 top-0 h-full w-[3px] bg-electric"
//   transition={{ type:'spring', stiffness:400, damping:35 }} />

// TABLE ROW STAGGER:
// variants: { hidden:{}, show:{ transition:{ staggerChildren:0.04 } } }
// row: { hidden:{ opacity:0, x:-10 }, show:{ opacity:1, x:0 } }

// KANBAN DRAG VISUAL:
// isDragging && { opacity:0.8, rotate:1.5, boxShadow:'0 20px 40px rgba(0,212,255,0.25)' }

// DRAWER:
// initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
// transition={{ type:'spring', stiffness:300, damping:30 }}

// TOAST STACK:
// initial={{ opacity:0, x:60, scale:0.95 }}
// animate={{ opacity:1, x:0, scale:1 }}
// exit={{ opacity:0, x:60, scale:0.95 }}
// transition={{ type:'spring', stiffness:300, damping:25 }}

// WRONG PASSPHRASE SHAKE:
// animate={{ x:[0,-12,12,-12,12,-6,6,0] }}
// transition={{ duration:0.45, ease:'easeInOut' }}

// RECOGNITION CARD HOVER (type-specific):
// AWARD: whileHover={{ boxShadow:'0 0 30px rgba(245,166,35,0.25)', y:-4 }}
// PRESS: whileHover={{ boxShadow:'0 0 30px rgba(233,69,96,0.2)', y:-4 }}
// COMMENDATION: whileHover={{ boxShadow:'0 0 30px rgba(0,212,255,0.2)', y:-4 }}
```

---

## SEED DATA — `src/data/seeds.js`

```js
// Initialise localStorage on first load if keys are empty

export const seedProjects = [
  { id:'p001', number:'001', title:'Portable Apple Grading System',
    hook:'AI-powered CNN sorts apples by defect detection in real time.',
    description:'CNN trained on apple surface images to detect defects such as black spots. Images from a camera are processed in real time, features extracted through convolutional layers, and classified using TensorFlow/Keras. The prediction triggers servo-based mechanical sorting integrated with embedded control systems.',
    category:'AGRICULTURE', status:'DEPLOYED', stack:['TensorFlow','Keras','OpenCV','Python','Servo Systems'],
    featured:true, createdAt: Date.now(), updatedAt: Date.now() },
  // ... all 10 projects
]

export const seedRecognition = [
  { id:'r001', type:'COMPETITION', institution:'IIT Delhi',
    achievement:'Youth Ideathon — Top 10 Nationally', date:'2023',
    description:'Competed against hundreds of student innovators from across India...',
    showOnPortfolio: true, createdAt: Date.now() },
  { id:'r002', type:'COMMENDATION', institution:'National Technology Week',
    achievement:'Personal Appreciation — PM Shri Narendra Modi', date:'2023',
    description:'During National Technology Week 2023, received direct recognition from the Prime Minister of India...',
    showOnPortfolio: true, createdAt: Date.now() },
]

export const seedProfile = {
  about: [
    'From the valleys of Kashmir, Adnan Mushtaq Lone builds artificial intelligence that works in the real world — embedded in hardware, deployed in fields, and measured by lives improved.',
    'Founder of tiwzz and CED, he operates at the intersection of deep learning and embedded systems...',
    'With national recognition from IIT Delhi and a personal commendation from the Prime Minister of India, his work represents what\'s possible when frontier AI meets urgency.'
  ],
  skills: ['CNN','OpenCV','TensorFlow','Keras','FPGA','Raspberry Pi','YOLO','LiDAR','Python','C++','Signal Processing','Sensor Fusion'],
  contact: { email:'adnan@tiwzz.com', linkedin:'linkedin.com/in/adnanmushtaq', github:'github.com/adnanmushtaq' },
  tagline: 'Engineering Intelligence. From Kashmir to the World.'
}

export const seedJournal = [
  { id:'j001', title:'Initial Setup — Command Portal Active',
    body:'# Dashboard Online\n\nThis is the Lab Journal. Use it for research ideas, experiment logs, project notes, and anything worth capturing.\n\n## Tags\nUse tags to organise entries by topic.\n\n## Markdown\nFull markdown is supported — **bold**, *italic*, `code`, lists, headings, blockquotes.\n\n> *"Build in silence. Let the work speak."*',
    tags:['#setup','#notes'], createdAt: Date.now(), updatedAt: Date.now() }
]

// On app init (App.jsx useEffect):
// if (!localStorage.getItem('adnan_projects')) storage.set('adnan_projects', seedProjects)
// if (!localStorage.getItem('adnan_recognition')) storage.set('adnan_recognition', seedRecognition)
// if (!localStorage.getItem('adnan_profile')) storage.set('adnan_profile', seedProfile)
// if (!localStorage.getItem('adnan_journal')) storage.set('adnan_journal', seedJournal)
// if (!localStorage.getItem('adnan_outreach')) storage.set('adnan_outreach', [])
// if (!localStorage.getItem('adnan_activity')) storage.set('adnan_activity', [])
```

---

## APP.JSX — ROOT COMPONENT

```jsx
// App.jsx:
// Check sessionStorage 'adnan_auth' === 'true'
// If not: render <PassphraseGate onSuccess={() => setAuthed(true)} />
// If yes: render full dashboard layout

// Dashboard layout:
// <div className="flex h-screen bg-void overflow-hidden">
//   <Sidebar activeModule={active} onNavigate={setActive} />
//   <div className="flex-1 flex flex-col overflow-hidden">
//     <TopBar module={active} onQuickAction={handleQuickAction} />
//     <main className="flex-1 overflow-y-auto p-6">
//       <AnimatePresence mode="wait">
//         <motion.div key={active} ...transition>
//           {active === 'overview'     && <Overview />}
//           {active === 'cms'          && <PortfolioCMS />}
//           {active === 'tracker'      && <ProjectTracker />}
//           {active === 'outreach'     && <OutreachLog />}
//           {active === 'recognition'  && <RecognitionWall />}
//           {active === 'journal'      && <LabJournal />}
//         </motion.div>
//       </AnimatePresence>
//     </main>
//   </div>
// </div>
// <ToastProvider /> (portal, fixed position)
```

---

## OUTPUT REQUIREMENTS

Produce a **complete, runnable React 18 + Vite application** with every file in the project structure. Specifically:

- `package.json` — all dependencies including `@dnd-kit/core`, `@dnd-kit/sortable`, `marked`
- `vite.config.js` + `tailwind.config.js` + `index.css` — fully configured
- `App.jsx` — auth gate + layout + AnimatePresence module routing
- All 6 modules fully built and functional
- All shared components: Drawer, ConfirmModal, Toast, TagInput, Badge
- All hooks: useLocalStorage, useToast, useActivity, useCountUp
- `src/data/seeds.js` — all 10 projects + 2 recognition entries + profile + journal seeded
- localStorage data layer — all reads/writes via the utility, never raw
- Drag-and-drop Kanban fully wired with @dnd-kit — drag updates project status in localStorage
- Lab Journal markdown editor with auto-save + preview + .md export
- Export all data as JSON download
- Passphrase gate with shake animation on wrong entry
- Framer Motion on every interaction: drawer, modal, toast, sidebar, module transitions, cards
- Responsive at 768px (icon sidebar) and 1024px+ (full sidebar)

**This is Adnan's personal command terminal. Make it feel like one. Extraordinary quality only.**

---

*END OF PROMPT — Adnan Dashboard | React 18 + Framer Motion + Tailwind + @dnd-kit | Zoonigia Build Team | March 2026*
