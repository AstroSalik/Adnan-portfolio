# PRODUCT REQUIREMENTS DOCUMENT
## Adnan Mushtaq Lone — Admin Dashboard / Command Portal
**Platform:** Antigravity | **Version:** 1.0 | **Prepared for:** Zoonigia Build Team | **Date:** March 2026

---

## 1. Executive Summary

A personal command-center dashboard for Adnan Mushtaq Lone — built to manage his public portfolio, track projects, log outreach, chronicle recognition, and maintain a research journal. No backend. No server. No complexity. Everything runs on `localStorage` with a clean JSON data layer, ready to swap to Firebase in one step when needed.

The dashboard is a **private, single-user application** — protected by a passphrase gate, accessible only to Adnan. It must feel like a mission control terminal: powerful, data-dense, beautiful, and fast.

Same design DNA as the portfolio — dark, cinematic, electric cyan + crimson accents, Orbitron + IBM Plex Mono — but shifted toward **utility and density** rather than showcase.

---

## 2. User & Context

- **User:** Adnan Mushtaq Lone (sole user)
- **Use case:** Daily/weekly operations — updating portfolio content, tracking project progress, logging professional outreach, recording new recognition, writing research notes
- **Access:** Protected by a hardcoded passphrase (no real auth — just a PIN gate)
- **Device:** Primarily desktop, responsive to tablet
- **Data persistence:** `localStorage` — survives browser sessions, exportable as JSON

---

## 3. Design System

### 3.1 Aesthetic

**"Classified Mission Terminal"** — imagine a deep-space operations console. Data-dense but not noisy. Dark panels, glowing borders, monospaced data, subtle scanline textures. Every element feels like it was designed for someone who takes their work seriously.

Distinct from the portfolio: where the portfolio is *cinematic and inspiring*, the dashboard is *precise and operational*. Less animation flourish, more micro-interaction polish. The difference between a movie trailer and the actual cockpit.

### 3.2 Color Tokens (same base, new roles)

```css
:root {
  --bg-void:         #050816;   /* app background */
  --bg-deep:         #080C24;   /* sidebar background */
  --bg-panel:        #0A0F2E;   /* cards, panels */
  --bg-input:        #0D1435;   /* input fields */
  --bg-hover:        #111840;   /* hover states */
  --accent-electric: #00D4FF;   /* primary — cyan, active states */
  --accent-fire:     #E94560;   /* danger, delete, critical */
  --accent-gold:     #F5A623;   /* warnings, recognition module */
  --accent-green:    #22C55E;   /* success, deployed, sent */
  --accent-purple:   #A855F7;   /* notes module accent */
  --text-primary:    #F0F4FF;
  --text-secondary:  #A8B4D4;
  --text-muted:      #6B7FA3;
  --border-subtle:   #1E3A5F;
  --border-active:   #00D4FF;
  --scrollbar-thumb: #1E3A5F;
}
```

### 3.3 Typography

| Role | Font |
|---|---|
| Module titles, headers | Orbitron 700 |
| Data, labels, inputs, body | IBM Plex Mono |
| UI labels, badges, buttons | Rajdhani 600 |

### 3.4 Layout

- **Fixed sidebar** — 260px wide, dark (`--bg-deep`), always visible on desktop
- **Main content area** — scrollable, `--bg-void` background
- **Top bar** — 60px, module title + quick actions + user monogram
- **Content panels** — `--bg-panel` cards with `1px --border-subtle` borders
- Sidebar collapses to icon-only on tablet (`<1024px`)
- Mobile: bottom tab bar (simplified, 5 icons)

---

## 4. Auth Gate

**Simple passphrase screen** shown before the dashboard loads:

- Full-screen dark overlay
- `AM` monogram logo centered
- Single password input: IBM Plex Mono, `--bg-input`, cyan border on focus
- `ENTER TERMINAL` button — Orbitron, electric cyan
- Hardcoded passphrase check in JS (e.g. `"adnan2026"` — changeable in source)
- Wrong passphrase: input shakes (Framer Motion `x` spring), border turns `--accent-fire`
- Correct: overlay fades out, dashboard slides in
- Session persists in `sessionStorage` — re-entry required on new tab/browser close

---

## 5. Sidebar Navigation

```
[AM] monogram logo (top)

─── MODULES ───
⬡  Dashboard         (overview/home)
◈  Portfolio CMS     (projects + bio + skills)
⬜  Project Tracker   (kanban board)
◎  Outreach Log      (opportunities table)
★  Recognition Wall  (awards + press)
✎  Lab Journal       (notes + ideas)

─── SYSTEM ───
↓  Export Data
⟳  Lock / Sign Out
```

- Active module: left border `3px --accent-electric`, text electric cyan, bg `--bg-hover`
- Hover: text transitions to electric cyan, subtle bg shift
- Module icons: lucide-react
- Notification badges on modules with unread/pending items

---

## 6. Module 00 — Dashboard Overview

**The home screen. At-a-glance command view.**

### Layout: stat row + activity feed + quick-access grid

**Stat Cards Row (top):**
- Total Projects: `10`
- Projects Deployed: `4`
- Outreach Entries: (count)
- Awards Logged: (count)
- Journal Entries: (count)
- Each card: Orbitron number in `--accent-electric`, label in IBM Plex Mono `--text-muted`
- Framer Motion count-up on mount

**Recent Activity Feed (left, 60%):**
- Chronological log of last 10 actions across all modules
- e.g. `[Portfolio CMS] Updated "Apple Grading System" — 2h ago`
- e.g. `[Outreach] Added entry: IIT Delhi Research Collab — 1d ago`
- Each entry: colored left border by module color, IBM Plex Mono, timestamp
- Auto-generated from localStorage write operations

**Quick Actions (right, 40%):**
- `+ New Project` → opens Portfolio CMS add form
- `+ Log Outreach` → opens Outreach Log add form
- `+ Add Award` → opens Recognition Wall add form
- `+ New Note` → opens Lab Journal new entry
- Each: Framer Motion `whileHover` lift + glow

---

## 7. Module 01 — Portfolio CMS

**Edit what the public portfolio shows. No code required.**

### 7.1 Projects Manager

**Table view** of all projects with inline actions:

| # | Title | Category | Status | Featured | Actions |
|---|---|---|---|---|---|
| 001 | Apple Grading System | AGRICULTURE | DEPLOYED | ✓ | Edit / Delete |

- Sortable columns
- Filter by category + status
- `+ Add Project` button — opens slide-in drawer form
- Row click → expands inline to show full description

**Project Form Fields (drawer):**
```
Title *
Hook (one-line description) *
Full Description * (textarea, markdown supported)
Category * (select: AGRICULTURE / AUTONOMOUS / DETECTION / DEFENCE / ASSISTIVE)
Status * (select: CONCEPT / PROTOTYPE / DEPLOYED)
Tech Stack (tag input — add/remove chips)
Featured (toggle — spans 2 columns on portfolio)
Project Number (auto-assigned, editable)
```

- Form validation: required fields highlighted in `--accent-fire` if empty on submit
- Save: updates localStorage `adnan_projects`, shows success toast
- Delete: confirmation modal before removal

### 7.2 Profile Editor

Separate tab within Portfolio CMS:

```
About Text (3 paragraph textareas)
Skill Tags (tag input — add/remove)
Contact: Email, LinkedIn URL, GitHub URL
Hero tagline
```

- Live character count on textareas
- Save button: Framer Motion pulse on success

---

## 8. Module 02 — Project Tracker

**Kanban board. Drag-and-drop project cards across stages.**

### Columns:
```
CONCEPT  →  IN PROGRESS  →  PROTOTYPE  →  DEPLOYED
```

- Each column: `--bg-panel`, header with column name + count badge
- Column header color-coded: CONCEPT=muted, IN PROGRESS=cyan, PROTOTYPE=gold, DEPLOYED=green

**Kanban Card:**
- Project title (Orbitron, small)
- Category badge (colored pill)
- Tech stack: 2–3 tags
- Last updated timestamp
- Notes snippet (1 line)
- Click → full detail drawer (same fields as Portfolio CMS form)

**Drag and Drop:**
- `@dnd-kit/core` + `@dnd-kit/sortable` — most lightweight DnD for React
- Drag: card lifts with `boxShadow` glow, opacity 0.85, cursor grab
- Drop: smooth settle animation via Framer Motion layout
- On drop: updates project status in localStorage automatically

**Add new project from Kanban:**
- `+` button in each column footer
- Opens minimal inline form: title + stack only, status pre-set to column

---

## 9. Module 03 — Outreach & Opportunities Log

**Track every professional contact, application, and collaboration.**

### Layout: filterable table + add form drawer

**Table columns:**
```
Date | Type | Organisation | Description | Status | Notes | Actions
```

**Entry Types:**
- `RESEARCH` — research collaboration inquiry
- `SPEAKING` — conference / event invite
- `APPLICATION` — job / fellowship / grant
- `PARTNERSHIP` — institutional partnership
- `MEDIA` — press / interview request
- `OTHER`

**Status Pipeline:**
```
DRAFT → SENT → REPLIED → IN PROGRESS → CLOSED (WON) → CLOSED (LOST)
```

- Status color-coded: SENT=cyan, REPLIED=gold, IN PROGRESS=green, CLOSED WON=green bright, CLOSED LOST=fire/muted

**Filters (top bar):**
- Filter by Type, Status, Date range
- Search by organisation name

**Add Entry Form (drawer):**
```
Date *
Type * (select)
Organisation / Contact *
Description *
Status * (select)
Notes (textarea)
Follow-up Date (date picker)
```

**Follow-up Alerts:**
- Entries with a follow-up date that has passed → highlighted row in `--accent-gold`
- Dashboard overview shows count of overdue follow-ups

---

## 10. Module 04 — Recognition Wall

**Log every award, feature, press mention, and commendation.**

### Layout: masonry/grid of recognition cards + add form

**Recognition Card:**
- Type badge: `AWARD` / `PRESS` / `FEATURE` / `COMMENDATION` / `COMPETITION`
- Institution / Source name (Orbitron)
- Title / Achievement headline
- Date
- Description paragraph
- Linked URL (optional)
- Image/certificate upload → stored as base64 in localStorage

**Visual treatment by type:**
- AWARD: gold border glow
- PRESS: fire/red left border
- COMMENDATION: electric cyan top border
- COMPETITION: purple accent

**Add Entry Form:**
```
Type * (select)
Institution / Source *
Achievement Title *
Date *
Description
URL (optional)
Upload Image (optional — stored base64)
```

**Live feed to portfolio:**
- Entries marked `Show on Portfolio: true` automatically appear in the Awards section of the public portfolio (if both apps share the same localStorage domain/key)

---

## 11. Module 05 — Lab Journal

**Research scratchpad. Ideas, experiments, project notes.**

### Layout: sidebar list of entries + main editor pane

**Left sidebar (entries list):**
- Entry title + date + tag pills
- Search bar at top
- Filter by tags
- `+ New Entry` button
- Active entry: highlighted with left border `--accent-purple`

**Right editor pane:**
```
Title (large, Orbitron)
Tags (tag input — add/remove chips)
Date (auto-set, editable)
Body (markdown textarea with live preview toggle)
```

- Markdown rendering: use `marked.js` (CDN) or `react-markdown`
- Preview toggle: split `EDIT / PREVIEW` tabs
- Auto-save to localStorage on keystroke (debounced 800ms)
- Save indicator: `// saved` in IBM Plex Mono `--text-muted` top-right, fades in on save

**Entry actions:**
- Duplicate
- Delete (confirmation)
- Export as `.md` file (triggers browser download)

**Tag system:**
- Suggested tags: `#research` `#idea` `#experiment` `#hardware` `#ml` `#paper` `#meeting`
- Custom tags allowed
- Tag filter in sidebar shows only matching entries

---

## 12. System Features

### 12.1 Export Data
- Single button: exports all localStorage data as a formatted `.json` file
- Browser download — `adnan_dashboard_export_[date].json`
- Import: drag-drop JSON file → restores all data

### 12.2 Lock / Sign Out
- Clears `sessionStorage` auth flag
- Returns to passphrase gate screen
- Framer Motion fade-out transition

### 12.3 Toast Notification System
- Global toast component (top-right corner)
- Types: SUCCESS (green), ERROR (fire), WARNING (gold), INFO (cyan)
- IBM Plex Mono text, 3s auto-dismiss
- Framer Motion slide-in from right, slide-out on dismiss

### 12.4 Confirmation Modals
- Used for: delete project, delete journal entry, delete recognition, clear data
- `AnimatePresence` modal — "Are you sure?" with CONFIRM / CANCEL
- CONFIRM: `--accent-fire` button
- CANCEL: ghost button

---

## 13. Animations & Interactions

All via **Framer Motion** — consistent with the portfolio app.

- **Auth gate:** overlay `opacity: 0→1` on load; fade-out + scale-up on correct passphrase
- **Wrong passphrase:** `x: [0,-10,10,-10,0]` shake spring animation on input
- **Sidebar navigation:** active indicator slides between items via `layoutId`
- **Module transition:** `AnimatePresence` — outgoing module fades left, incoming fades right
- **Drawer (forms):** slides in from right — `x: 100%→0`, backdrop fades in
- **Kanban drag:** `boxShadow` glow + subtle rotation on drag (`rotate: 2deg`)
- **Cards:** `whileHover: { y:-3, borderColor:'--accent-electric' }`
- **Stat counters:** count-up on dashboard mount
- **Toast:** `x: 100→0` slide in, `opacity: 1→0` + `x: 0→100` slide out
- **Table rows:** stagger-fade in on module load
- **Delete confirmation:** scale pulse on CONFIRM button hover

---

## 14. Technical Requirements

### 14.1 Stack

```
React 18
Framer Motion ^11
Tailwind CSS (same tokens as portfolio)
Vite
lucide-react (icons)
@dnd-kit/core + @dnd-kit/sortable (Kanban drag-drop)
marked (markdown rendering in Lab Journal)
```

### 14.2 Data Layer

```js
// localStorage keys:
'adnan_auth'         // sessionStorage — auth flag
'adnan_projects'     // array of project objects
'adnan_profile'      // bio, skills, contact
'adnan_outreach'     // array of outreach entries
'adnan_recognition'  // array of recognition entries
'adnan_journal'      // array of journal entries
'adnan_activity'     // array of recent activity log entries

// All reads/writes via a thin localStorage utility:
// storage.get(key) → JSON.parse
// storage.set(key, value) → JSON.stringify + setItem
// storage.update(key, id, patch) → find by id + merge
// storage.delete(key, id) → filter out by id
```

### 14.3 Project Structure

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
│   ├── Toast.jsx
│   ├── TagInput.jsx
│   ├── Badge.jsx
│   └── ConfirmModal.jsx
├── hooks/
│   ├── useLocalStorage.js
│   ├── useToast.js
│   ├── useActivity.js
│   └── useCountUp.js
└── data/
    └── seeds.js          // initial seed data (10 projects pre-loaded)
```

### 14.4 Responsiveness

| Breakpoint | Layout |
|---|---|
| `<768px` | Bottom tab bar (5 tabs), single column, no Kanban drag |
| `768px–1024px` | Sidebar icon-only (48px), collapsible |
| `>1024px` | Full sidebar (260px), all features |

---

## 15. Page / Module Order

```
00 → Overview (Dashboard Home)
01 → Portfolio CMS
02 → Project Tracker (Kanban)
03 → Outreach Log
04 → Recognition Wall
05 → Lab Journal
── → Export Data
── → Lock
```

---

## 16. Deliverables

- [x] PRD — this document
- [x] Antigravity implementation prompt (complete)
- [ ] Complete React 18 + Vite dashboard application
- [ ] All 6 modules fully functional
- [ ] localStorage data layer with seed data
- [ ] Passphrase auth gate
- [ ] Drag-and-drop Kanban board
- [ ] Markdown editor + preview in Lab Journal
- [ ] Toast + confirmation modal system
- [ ] Export/import JSON feature
- [ ] Fully responsive at 768px and 1024px+

---

*PRD prepared by Zoonigia Build Team | Adnan Mushtaq Lone — Admin Dashboard | React 18 + Framer Motion + Tailwind CSS | March 2026*
