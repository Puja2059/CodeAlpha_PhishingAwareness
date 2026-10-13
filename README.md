# CodeAlpha_PhishingAwareness — Interactive Phishing Awareness Training Platform

[![CodeAlpha Task 2](https://img.shields.io/badge/CodeAlpha-Cyber_Security_Task_2-06b6d4?style=for-the-badge&logo=shield)](https://codealpha.tech/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Security](https://img.shields.io/badge/Simulation-100%25_Safe_Sandbox-10b981?style=for-the-badge&logo=lock)](https://cisa.gov/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

An interactive, responsive, scenario-driven web application developed for **CodeAlpha Cyber Security Internship Task 2: Phishing Awareness Training**.

---

## 🎯 1. Project Overview & Problem Statement

### The Threat Reality
According to global cybersecurity threat reports, over **85% of corporate breaches involve a human element**, and phishing remains the leading initial access vector for ransomware and data theft. Traditional employee training often relies on passive, slide-based presentations that fail to cultivate intuitive threat detection instincts.

### The Solution
**CodeAlpha_PhishingAwareness** bridges the gap between theoretical knowledge and practical forensic skills. Users do not merely read about phishing—they actively dissect suspicious emails, classify deceptive URLs, resolve psychological social engineering pretexts in a sandbox environment, and earn milestone badges backed by persistent client-side progress tracking.

---

## ✨ 2. Key Features

### 🛡️ A. Modern Cybersecurity Dashboard
- **Live Progress & Scoring:** Real-time calculation of course progress (%), completed modules, simulation XP, and security tier rank (*Cyber Recruit* → *Cyber Sentinel Master*).
- **Persistent State:** Saves user progress, completed scenarios, quiz attempts, and badges in `localStorage`.
- **Progress Reset:** Safe reset dialog with confirmation modal.

### 📚 B. Six In-Depth Learning Modules
1. **Module 1: Introduction to Phishing & Social Engineering**
   - Attacker objectives (credential harvesting, BEC wire fraud, initial access brokerage).
   - Attack vectors: Spear phishing, Whaling, Smishing, Vishing, Clone phishing, BEC, and Quishing (QR code phishing).
   - Knowledge checkpoint with instant explanation.
2. **Module 2: Detecting Suspicious Emails & Spoofing**
   - Dissects display name spoofing vs. genuine envelope sender domains and reply-to mismatches.
   - Debunks the *"clean grammar means legitimate"* myth in the age of LLM-generated phishing lures.
   - **Interactive Email Dissection Tool:** Clickable inspection hotspots for sender headers, reply-to routing, threatening subject lines, fake trust seals, and deceptive hyperlinks.
   - **Safe Simulation Interception Modal:** Safely intercepts clicks on simulated links with forensic analysis.
3. **Module 3: Identifying Fake Websites & Deceptive URLs**
   - Explains URL anatomy: Protocol, subdomains, registered root domain (SLD), and paths.
   - **The Padlock Fallacy:** Uncovers why HTTPS encryption does *not* prove authenticity (over 80% of phishing sites use valid SSL certificates).
   - Combosquatting, typosquatting, and multi-tier subdomain deception.
   - **Interactive URL Inspector:** Classify real vs. deceptive URLs with instant forensic breakdown.
4. **Module 4: Social Engineering Tactics & Psychology**
   - Cialdini's persuasion principles: Authority, Urgency, Fear, Curiosity, Greed, and Likability.
   - **Interactive Decision Simulator:** Four branching workplace scenarios (CEO Gift Card request, IT Desk vishing, Delivery fee SMS, Vendor wire account modification) with Out-of-Band (OOB) verification guidance.
5. **Module 5: Safe Response, Incident Protocol & Prevention**
   - Phishing-resistant MFA (FIDO2 passkeys / WebAuthn) vs. vulnerable legacy SMS OTPs.
   - Password managers as cryptographic domain matchers.
   - Step-by-step incident response playbook (*Disconnect → Change password from clean device → Revoke active sessions → Report to SOC*).
   - Interactive individual & enterprise cybersecurity defense checklists.
6. **Module 6: Comprehensive Knowledge Assessment**
   - 12-question randomized certification exam covering all curriculum vectors.
   - 80% passing threshold with instant review mode.
   - Awards the **Phish Hunter Pro** certificate badge.

### 🧪 C. Interactive Phishing Simulation Laboratory
A dedicated laboratory featuring five realistic, safe fictional attack scenarios:
1. **Scenario 1: Urgent Bank Account Suspension Notice** (Financial Credential Harvesting via lookalike `.online` domain).
2. **Scenario 2: Postal Delivery Surcharge Smishing** (Mobile SMS with interactive smartphone frame mockup & tracking lures).
3. **Scenario 3: Corporate Microsoft 365 Password Expiry Alert** (SSO credential trap on a `.biz` root domain).
4. **Scenario 4: Executive BEC Wire Transfer Request** (CEO impersonation bypassing standard dual-authorization controls under extreme deadline pressure).
5. **Scenario 5: Overdue Vendor Invoice with Double Extension** (Disguised executable malware payload: `Invoice_Summary_88921.pdf.exe`).

Each scenario includes:
- Realistic inspectable interface (headers, body, attachment, link previews).
- Red flag checklist with scoring and penalty for false positives.
- Official SOC Analyst Forensic Debriefing Report with MITRE ATT&CK technique mapping.

---

## 🛠️ 3. Technology Stack

- **Frontend Framework:** React 19 + Vite 8
- **Language:** JavaScript (ES6+ / JSX)
- **Styling:** Custom CSS Design System with dark slate/navy palette, neon cyan accents, and glassmorphic panels
- **Icons:** Lucide React
- **Storage:** Browser `localStorage` (resilient client-side persistence with fallback handling)
- **Deployment:** GitHub Pages ready (relative base asset paths)

---

## 📁 4. Project Structure

```text
CodeAlpha_Phishing-awarness/
├── public/
│   └── favicon.svg              # Cybersecurity shield SVG favicon
├── src/
│   ├── components/
│   │   ├── AchievementBadge.jsx # Milestone badges card
│   │   ├── Footer.jsx           # Attribution, disclaimer & external resources
│   │   ├── InteractiveChecklist.jsx     # Individual & org controls
│   │   ├── InteractiveEmailViewer.jsx   # Hotspot email dissection tool
│   │   ├── InteractiveScenarioDecision.jsx # Social engineering simulator
│   │   ├── InteractiveUrlInspector.jsx  # URL heuristic classifier
│   │   ├── ModuleCard.jsx       # Curriculum module cards
│   │   ├── Navbar.jsx           # Responsive header & rank widget
│   │   ├── ProgressBar.jsx      # Animated accessible progress bar
│   │   ├── Quiz.jsx             # Reusable assessment engine
│   │   ├── ResetModal.jsx       # Reset progress confirmation modal
│   │   ├── SafeInterceptionModal.jsx    # Interception warning modal
│   │   └── ScenarioCard.jsx     # Email & SMS simulation viewer
│   ├── data/
│   │   ├── badgesData.js        # Badge definitions & unlock logic
│   │   ├── checklistData.js     # Technical & organizational checklist
│   │   ├── modulesData.js       # Curriculum content for 6 modules
│   │   ├── questionsData.js     # 12 assessment questions & explanations
│   │   └── scenariosData.js     # 5 simulation laboratory attack scenarios
│   ├── hooks/
│   │   └── useProgress.js       # State management, points & rank calculation
│   ├── styles/
│   │   └── components.css       # Layout, simulation & component styles
│   ├── utils/
│   │   └── storage.js           # Safe localStorage interface & defaults
│   ├── App.jsx                  # Main routing & application coordinator
│   ├── index.css                # Global tokens, typography & CSS reset
│   └── main.jsx                 # React root entry point
├── index.html                   # HTML document with SEO & security meta tags
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite configuration with relative base path
└── README.md                    # Project documentation
```

---

## 🚀 5. Getting Started & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/CodeAlpha_PhishingAwareness.git
   cd CodeAlpha_PhishingAwareness
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173/` to view the interactive training platform.

### Code Quality & Production Build

- **Run linter:**
  ```bash
  npm run lint
  ```
- **Create production build:**
  ```bash
  npm run build
  ```
- **Preview production build locally:**
  ```bash
  npm run preview
  ```

---

## 📸 6. Screenshots & Demonstration Guide

*(Replace these image paths with your actual screenshots when preparing your LinkedIn demo video or portfolio showcase)*

| Section | Description |
| :--- | :--- |
| **Command Center Dashboard** | Displays overall progress, security tier, modules grid, and unlocked milestone badges. |
| **Interactive Email Dissection** | Dissecting fake PayPal email headers, display name spoofing, and reply-to traps. |
| **URL Heuristic Inspector** | Classifying lookalike domains, deceptive subdomains, and debunking the HTTPS padlock myth. |
| **Simulation Lab (SMS Smishing)** | Inspecting an unsolicited postal surcharge smishing lure in a smartphone mockup. |
| **Certification Assessment** | 12-question exam providing instant forensic feedback and awarding the Phish Hunter badge. |

---

## 🔒 7. Safety, Ethical & Pedagogical Governance

1. **100% Benign Simulation:** All domains (e.g. `chase-bank-verify.online`, `usps-tracking-redeliver.top`, `portal-auth.biz`), email addresses, and phone numbers are fictional pedagogical examples.
2. **No Data Harvesting:** The application never requests, stores, or transmits genuine passwords, credit card numbers, or personally identifiable information (PII).
3. **Safe Interception:** Clicking simulated links triggers educational popups explaining attacker mechanics. No external malicious endpoints are contacted.
4. **Defensive Focus:** The platform exists strictly for defensive cybersecurity education under white-hat principles.

---

## 🌐 8. Authoritative Phishing Defense Resources

- **CISA (Cybersecurity & Infrastructure Security Agency):** [Recognize and Report Phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)
- **FTC (Federal Trade Commission):** [How to Avoid Phishing Scams](https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams)
- **UK NCSC (National Cyber Security Centre):** [Phishing Scams Guidance](https://www.ncsc.gov.uk/collection/phishing-scams)
- **APWG (Anti-Phishing Working Group):** [Phishing Activity Trends](https://apwg.org/)

---

## 🚢 9. Publishing to GitHub & GitHub Pages

Follow these exact steps to publish to your GitHub repository:

### Step 1: Initialize Git & Commit
```bash
git init
git add .
git commit -m "feat: complete interactive phishing awareness training platform for CodeAlpha Task 2"
```

### Step 2: Connect to Remote & Push
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/CodeAlpha_PhishingAwareness.git
git push -u origin main
```

### Step 3: Deploy to GitHub Pages (Automated via GitHub Actions)
1. In your GitHub repository, navigate to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Choose the standard **Static HTML** or **Vite** starter workflow, or push the built `dist/` directory using `gh-pages`:
   ```bash
   npx gh-pages -d dist
   ```

---

## 📜 10. Submission Details

- **Internship:** CodeAlpha Cyber Security Internship
- **Task:** Task 2 — Phishing Awareness Training
- **Repository Name:** `CodeAlpha_PhishingAwareness`
- **Application Type:** Fully Interactive Client-Side Web Application

Developed with modern frontend standards, responsive design, and cybersecurity best practices.
