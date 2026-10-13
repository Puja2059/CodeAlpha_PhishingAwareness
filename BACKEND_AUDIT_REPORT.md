# Backend Architecture & Comprehensive Feature Audit Report

**Project:** CodeAlpha Phishing Awareness Training Platform  
**Internship:** CodeAlpha Cyber Security Internship (Task 2)  
**Repository:** [https://github.com/Puja2059/CodeAlpha_PhishingAwareness](https://github.com/Puja2059/CodeAlpha_PhishingAwareness)  
**Live Site:** [https://puja2059.github.io/CodeAlpha_PhishingAwareness/](https://puja2059.github.io/CodeAlpha_PhishingAwareness/)  
**Audit Date:** October 2026  
**Auditor / Analysis Environment:** Antigravity AI Pair Programmer (Node.js v24.20.0 / Vite 8 / React 19)

---

## 1. Executive Summary & Architecture Determination

### Actual Project Architecture
The project is a **100% Client-Side Single Page Application (SPA)** built with **React 19.2** and **Vite 8.3**.

- **Frontend Framework:** React 19 (functional components + hooks)
- **Bundler & Tooling:** Vite 8 with `@vitejs/plugin-react`
- **Routing:** Tab-based declarative state routing inside `App.jsx` (`dashboard`, `modules`, `module-detail`, `simulation`, `assessment`, `about`)
- **Backend API:** **None**
- **Database:** **None**
- **State Persistence:** Browser `localStorage` via `src/utils/storage.js` and `src/hooks/useProgress.js`

### Did the Inspection Find a Backend?
> **Explicit Finding:** **NO BACKEND EXISTS** in this codebase.
> 
> There are no Node.js/Express servers, Python/Flask/FastAPI apps, PHP scripts, Go binaries, or serverless functions. There are no database drivers (MongoDB, PostgreSQL, MySQL, SQLite, Prisma), no REST/GraphQL API controllers, and no outgoing network requests (`fetch()`, `axios`, or `XMLHttpRequest`) to any external server.

### Is a Backend Necessary for This Application?
**No, a backend is neither required nor recommended for the current project goals.**

1. **GitHub Pages Compatibility:** GitHub Pages is a static file web host. It cannot execute server-side code (Node.js, Python, PHP). The client-side architecture allows seamless, zero-cost, serverless deployment.
2. **Pedagogical Safety & Zero Data Harvesting:** The core ethical promise of this cybersecurity training platform is that it is a **100% benign simulation with zero data harvesting**. Because there is no backend server or remote database, user quiz answers, simulation clicks, and progress never leave the user's local browser sandbox.
3. **Instant Latency & Offline Capability:** Simulations, forensic inspections, scoring algorithms, and certificate badge evaluations run synchronously in memory.

*(Note: A backend would only be needed if you later expand the project to include multi-user accounts, an organization-wide administrator dashboard, a centralized employee leaderboard, or real automated email phishing campaigns).*

---

## 2. Source Code Inspection Details

| Source Element | Inspected Path | Finding |
| :--- | :--- | :--- |
| **Package Dependencies** | [`package.json`](file:///c:/Users/asus/Documents/cybersecurity/CodeAlpha_Phishing-awarness/package.json) | Only `react`, `react-dom`, and `lucide-react`. Zero backend or network libraries (no `express`, `axios`, `dotenv`, `cors`, `pg`, `mongoose`). |
| **Vite Configuration** | [`vite.config.js`](file:///c:/Users/asus/Documents/cybersecurity/CodeAlpha_Phishing-awarness/vite.config.js) | Standard Vite React config with `base: '/CodeAlpha_PhishingAwareness/'`. No proxy rules to a local API server. |
| **Network Calls** | Entire `src/` directory | 0 occurrences of `fetch()`, `axios`, `XMLHttpRequest`, or `WebSocket`. |
| **Simulated URLs** | [`src/data/scenariosData.js`](file:///c:/Users/asus/Documents/cybersecurity/CodeAlpha_Phishing-awarness/src/data/scenariosData.js) | Fictional URLs (`.xyz`, `.online`, `.top`, `.net`) used strictly as educational mockup display strings and safely intercepted by `SafeInterceptionModal.jsx`. |
| **Storage Utilities** | [`src/utils/storage.js`](file:///c:/Users/asus/Documents/cybersecurity/CodeAlpha_Phishing-awarness/src/utils/storage.js) | Manages client-side browser `localStorage` under the key `codealpha_phishing_awareness_state_v1`. Handles load, save, and reset with fallback defaults. |

---

## 3. Database & Storage Mechanisms

The application utilizes browser `localStorage` as its data layer.

### State Schema:
```json
{
  "completedModules": [1, 2, 3],
  "completedScenarios": ["chase-account-suspension", "postal-delivery-smishing"],
  "scenarioScores": {
    "chase-account-suspension": 100,
    "postal-delivery-smishing": 85
  },
  "scenarioFindings": {
    "chase-account-suspension": {
      "selected": ["fake-sender-domain", "mismatched-reply-to", "artificial-urgency"],
      "score": 100,
      "completedAt": "2026-10-13T22:00:00.000Z"
    }
  },
  "quizAttempts": [
    {
      "date": "2026-10-13T22:10:00.000Z",
      "score": 10,
      "total": 12,
      "percentage": 83,
      "passed": true
    }
  ],
  "bestQuizScore": 83,
  "assessmentPassed": true,
  "checklist": {
    "pwd-mgr": true,
    "fido2-mfa": true
  },
  "totalPoints": 485,
  "lastUpdated": "2026-10-13T22:10:00.000Z"
}
```

- **Persistence Behavior:** Data automatically survives browser page refreshes and tab reopens.
- **Reset Capability:** Users can clear all progress via the "Reset Progress" modal in the Dashboard, which triggers `clearStoredProgress()` and resets state to `DEFAULT_STATE`.

---

## 4. Feature-by-Feature Verification & Test Results

| Feature / Component | Implementation Location | Verified Functionality | Status |
| :--- | :--- | :--- | :--- |
| **1. Command Center Dashboard** | `src/pages/Dashboard.jsx` | Calculates real-time progress (%), displays current security rank, shows module completion metrics, and provides "Continue Training Journey" routing. |  **VERIFIED** |
| **2. Learning Curriculum (6 Modules)** | `src/pages/LearningModules.jsx`, `src/pages/ModuleDetail.jsx`, `src/data/modulesData.js` | All 6 modules render educational content, breakdown takeaways, and interactive tools. Modules 1–5 feature interactive quick-checks; Module 6 connects to certification. |  **VERIFIED** |
| **3. Interactive Email Dissection Tool** | `src/components/InteractiveEmailViewer.jsx` | Clickable inspection hotspots for headers, reply-to routing, deceptive subject lines, and fake links. Safe interception modal triggers upon clicking simulated links. |  **VERIFIED** |
| **4. Heuristic URL Inspector** | `src/components/InteractiveUrlInspector.jsx` | 5 interactive URLs to classify legitimate vs deceptive sites, debunking the HTTPS padlock fallacy with granular forensic feedback. |  **VERIFIED** |
| **5. Branching Workplace Decision Simulator** | `src/components/InteractiveScenarioDecision.jsx` | 4 branching scenarios (CEO gift card lure, IT desk vishing, postal surcharge smishing, vendor wire redirection) with Out-of-Band (OOB) guidance. |  **VERIFIED** |
| **6. Phishing Simulation Lab (5 Scenarios)** | `src/pages/SimulationLab.jsx`, `src/components/ScenarioCard.jsx`, `src/data/scenariosData.js` | 5 threat scenarios (financial phishing, postal smishing, M365 credential harvest, invoice PDF BEC, fake software update). Scored based on red flag detection and false-positive penalties. |  **VERIFIED** |
| **7. Certification Knowledge Assessment** | `src/pages/Assessment.jsx`, `src/components/Quiz.jsx`, `src/data/questionsData.js` | 12-question randomized certification exam covering all 6 modules. Enforces 80% passing threshold, gives instant question review, and unlocks the Phish Hunter badge. |  **VERIFIED** |
| **8. Milestone Badges Engine** | `src/components/AchievementBadge.jsx`, `src/data/badgesData.js` | 7 unlockable badges evaluated dynamically against progress state. |  **VERIFIED** |
| **9. Progress Persistence** | `src/utils/storage.js`, `src/hooks/useProgress.js` | Synchronizes state to `localStorage` automatically on every state mutation; loads stored progress on initial render. |  **VERIFIED** |
| **10. Safe Reset Dialog** | `src/components/ResetModal.jsx` | Double-confirmation modal that wipes `localStorage` and resets all metrics to baseline. |  **VERIFIED** |

---

## 5. Security & Ethical Review

| Security Dimension | Finding | Assessment |
| :--- | :--- | :--- |
| **Exposed Secrets & Keys** | Automated code search for credentials, tokens, and API secrets found zero leaked keys. |  **SAFE** |
| **User Input Sanitization** | `dangerouslySetInnerHTML` is only used to format static educational markdown (`**bold**` and `` `code` ``) from the bundled `modulesData.js`. No user-supplied text or search queries are rendered unsanitized. |  **SAFE** |
| **Simulated Link Safety** | Clicking simulated links in emails and SMS messages does not navigate to external destinations. Clicks are intercepted client-side by `SafeInterceptionModal.jsx`. |  **SAFE** |
| **Credential Harvesting Risk** | The app never prompts for, transmits, or logs real user passwords or personal data. |  **SAFE** |
| **External Requests** | Zero outbound tracking scripts, analytics trackers, or third-party ads. |  **SAFE** |

---

## 6. Automated Tests Executed & Results

An automated unit test suite was implemented in [`tests/app.test.js`](file:///c:/Users/asus/Documents/cybersecurity/CodeAlpha_Phishing-awarness/tests/app.test.js) using Node.js's native test runner (`node --test`).

### Test Execution Command:
```bash
npm test
```

### Verified Test Results:
```text
▶ Storage & Default State
  ✔ DEFAULT_STATE contains expected structure and properties (1.08ms)
✔ Storage & Default State (1.94ms)

▶ Curriculum Data Integrity
  ✔ has 6 learning modules with valid IDs and categories (0.26ms)
  ✔ has 5 phishing simulation scenarios with indicators and forensic reports (0.24ms)
  ✔ has 12 assessment questions with valid options and correct answer indices (0.18ms)
✔ Curriculum Data Integrity (0.91ms)

▶ Badge Awarding Conditions
  ✔ correctly evaluates badge unlock predicates (1.06ms)
✔ Badge Awarding Conditions (1.21ms)

▶ Scoring & Progression Formulas
  ✔ scenario indicator scoring handles correct detections, penalties, and clamping (0.35ms)
  ✔ calculates total points and security tiers correctly (0.38ms)
  ✔ overall progress percentage weights modules (45%), scenarios (35%), and exam (20%) (0.21ms)
✔ Scoring & Progression Formulas (1.29ms)

ℹ tests 8
ℹ suites 4
ℹ pass 8
ℹ fail 0
ℹ duration_ms 103.38ms
```

### Build & Linter Verification:
- **Linter (`npm run lint`):** `oxlint` reported **0 errors, 0 warnings** across 30 files.
- **Production Build (`npm run build`):** Vite generated production bundle cleanly in `dist/` with subpath assets (`/CodeAlpha_PhishingAwareness/assets/...`).

---

## 7. Confirmed Bugs Identified & Fixed

During this audit, one subtle component state bug was confirmed and fixed:

- **Bug Description:** In [`src/App.jsx`](file:///c:/Users/asus/Documents/cybersecurity/CodeAlpha_Phishing-awarness/src/App.jsx#L74-L86), `<ModuleDetail />` was rendered without a `key={activeModuleId}` prop. When a user completed a module and clicked "Mark Complete & Continue", React reused the existing `<ModuleDetail />` DOM tree without re-initializing its local `useState` variables (`quickCheckChoice` and `quickCheckSubmitted`). As a result, the next module's quick-check question immediately appeared as already answered with the prior module's selection.
- **Fix Applied:** Added `key={activeModuleId}` to `<ModuleDetail key={activeModuleId} ... />` in `src/App.jsx`. When navigating between modules, the component now unmounts and cleanly re-initializes its quick-check state for the new module.

---

## 8. CI/CD Integration Update

The automated test runner was also added to the continuous deployment pipeline in [`.github/workflows/deploy.yml`](file:///c:/Users/asus/Documents/cybersecurity/CodeAlpha_Phishing-awarness/.github/workflows/deploy.yml):
```yaml
      - name: Lint check
        run: npm run lint

      - name: Run automated tests
        run: npm test

      - name: Build project
        run: npm run build
```
This ensures that every push to `main` verifies unit tests before deploying to GitHub Pages.

---

## 9. How to Run the Project Locally

Clone and run the application locally with these commands:

```bash
# 1. Install dependencies
npm install

# 2. Run the linter
npm run lint

# 3. Execute automated unit tests
npm test

# 4. Start local development server
npm run dev

# 5. Build for production preview
npm run build
npm run preview
```

---

## 10. Summary & Recommendations

1. **Keep the Client-Side Architecture:** The current frontend-only architecture is optimal for GitHub Pages hosting, zero-cost operation, and maximum user privacy.
2. **Preserve Zero-Data-Harvesting:** Continue the practice of safely intercepting simulated links client-side to ensure compliance with white-hat educational standards.
3. **Continuous Integration:** The added `npm test` workflow ensures data integrity and scoring formulas remain protected against regressions during future additions.
