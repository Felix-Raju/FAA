# FAA — Creative Technology Collective
> **Three minds. One vision.**  
> **F — Felix** • **A — Akshat** • **A — Akzath**

A modern technology brand and collective portfolio website engineered with a dark charcoal aesthetic, subtle glowing accents, glassmorphism, responsive 3D micro-interactions, and real-time interactive canvas experiments.

---

## 🌟 Brand & Design Highlights

- **Monumental Brand Identity**: Centered around the **FAA** brand with custom typography and kinetic letter hover interactions.
- **Cinematic Dark Theme**: Deep obsidian `#07090e` backdrop with subtle cybernetic grid overlay and ambient glowing auroras.
- **Glassmorphism**: Frosted glass cards (`backdrop-filter: blur(16px)`) with gradient borders and 3D card tilt effects that track the cursor.
- **Interactive Background & Canvas**:
  - Ambient particle constellation responding fluidly to mouse movement.
  - Interactive Cursor light glow follower.
- **Interactive Showcase Lab**:
  - *Experiment 01*: Real-time interactive neural synaptic canvas (click to spawn nodes).
  - *Experiment 02*: 64-band dynamic audio frequency harmonics responding to cursor movement.
  - *Experiment 03*: Live simulated telemetry stream console syncing nodes across F-01, A-02, and A-03.
- **Fully Responsive**: Flawless experience across mobile, tablet, laptop, and ultrawide screens.
- **Zero Heavy Dependencies**: Pure semantic HTML5, modern CSS3, and modular vanilla JavaScript. Works 100% offline without needing build tools or package managers.

---

## 🚀 Quick Start (Running Locally)

### Option 1: Direct File Open
Simply double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, Brave, Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended)
If you have Python installed:
```bash
# In the project directory:
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

Or with Node.js / `npx`:
```bash
npx serve .
```

---

## 🛠️ How to Customize

All code is cleanly organized with explicit comments indicating where you can customize text, links, and assets:

### 1. Team Profiles (Felix, Akshat, Akzath)
Open [index.html](file:///c:/Users/Felix/Downloads/FAA/index.html) and find the `<section id="team">` section:
- **Felix (Node 01 // F)**:
  - Role: AI & Data Science Student
  - Interests: Programming, AI, Data Science, Video Editing, Machine Learning
  - Update GitHub, LinkedIn, and Email links in the `member-socials` container.
- **Akshat (Node 02 // A)**:
  - Look for `<!-- EDITABLE PLACEHOLDER TEXT FOR AKSHAT -->`
  - Update bio, skills, interests pills, and social profile links.
- **Akzath (Node 03 // A)**:
  - Look for `<!-- EDITABLE PLACEHOLDER TEXT FOR AKZATH -->`
  - Update bio, skills, interests pills, and social profile links.

### 2. Projects Showcase
Open [index.html](file:///c:/Users/Felix/Downloads/FAA/index.html) and locate `<section id="projects">`:
- Each project card contains:
  - Project Title (`project-name`)
  - Description (`project-desc`)
  - Tech tags (`tech-tag`)
  - GitHub Repository Link (`href="https://github.com/..."`)
  - Live Demo Link (`href="..."`)
  - Category tag (`data-category="ai"`, `"systems"`, or `"creative"`)

### 3. Skills Matrix
In `<section id="skills">`, you can add or adjust skill items. Each skill card features:
- Skill name & summary
- Category badge
- `data-level="95%"` attribute on `.skill-progress-fill` to adjust the animated meter level.

### 4. Direct Contact Channels
In `<section id="contact">`, update:
- Email address (`mailto:...`)
- GitHub organization URL
- Instagram handle URL
- LinkedIn page URL

---

## 🌐 Free Deployment Guide

### Deploy to GitHub Pages
1. Push this folder to a GitHub repository (e.g. `github.com/username/faa`).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Deploy to Vercel or Netlify
- Drag and drop the FAA project folder directly onto [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) for instant global edge deployment with free SSL and custom domain support.

---

## 📁 Project Structure

```text
FAA/
├── index.html         # Main semantic webpage with all sections
├── css/
│   └── style.css      # Dark charcoal aesthetic, glassmorphism, animations, media queries
├── js/
│   └── main.js        # Canvas particles, 3D card tilt, Showcase experiments, contact toast
└── README.md          # Documentation and customization guide
```

---

© 2026 FAA Collective. Engineered by Felix, Akshat, and Akzath.
