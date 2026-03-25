# Delivery Insurance Fraud Detection Prototype

A React + Vite prototype that demonstrates how delivery insurance claims can be evaluated with multi-signal fraud checks, instead of trusting GPS alone.

## Inspiration

GPS-only claim verification is vulnerable to spoofing. This project was built to show a safer and more explainable approach where multiple independent checks contribute to the final claim decision.

## What It Does

The app analyzes a simulated insurance claim using three fraud indicators:

- Fake GPS detection
- Device mismatch detection
- Abnormal behavioral pattern detection

Each indicator contributes to a weighted risk score. The app then shows:

- Individual check status
- Final risk score
- Risk level (`LOW`, `MEDIUM`, `HIGH`)
- Final claim decision (`APPROVED` or `FLAGGED`)

## Solution Architecture

The architecture is intentionally layered and explainable.

1. Signal Collection Layer
- Collects three independent fraud signals: GPS, device, behavior.

2. Scoring Layer
- Converts active signals into a weighted total score:

$$
Risk = 30G + 25D + 20B
$$

Where:

- $G = 1$ when fake GPS is detected, otherwise $0$
- $D = 1$ when device mismatch is detected, otherwise $0$
- $B = 1$ when abnormal behavior is detected, otherwise $0$

3. Decision Layer
- Uses a transparent rule:

$$
Decision =
\begin{cases}
FLAGGED, & \text{if } Risk > 50 \\
APPROVED, & \text{if } Risk \le 50
\end{cases}
$$

4. UX Layer
- Displays a visual meter, score breakdown, and human-readable explanation so non-technical users can understand the result.

## Features Included

- Multi-layer fraud detection simulation
- Weighted risk scoring system
- Risk level classification bands
- Manual test toggles for each fraud signal
- Real-time score meter and breakdown
- Final decision card with explanation
- Responsive UI for desktop and mobile

## How We Built It

- Frontend: React 18
- Build tooling: Vite 4
- Logic: JavaScript functions for scoring and decisioning
- Styling: CSS with dashboard-style components

The core logic is implemented in [src/App.jsx](src/App.jsx), and UI styling is in [src/App.css](src/App.css).

## Challenges We Ran Into

- Balancing detection and fairness for legitimate users
- Keeping decision logic simple but still realistic
- Making fraud results understandable for non-technical reviewers
- Setting up GitHub Pages deployment with repository subpath routing

## Accomplishments We Are Proud Of

- Delivered a working end-to-end fraud analysis prototype
- Added explainable and transparent decisioning
- Deployed the app publicly on GitHub Pages
- Produced recruiter-friendly documentation and workflow templates

## What We Learned

- Defense-in-depth is critical against spoofing attacks
- Explainability is essential in trust-sensitive systems
- Product storytelling and documentation are as important as code

## What Is Next

- Add backend API and persistent claim history
- Add real geofence and telemetry validation
- Add investigator dashboard for flagged claims
- Add automated tests for scoring boundaries

## Tech Stack

React, Vite, JavaScript, CSS, GitHub Actions, GitHub Pages

## Run Locally

Use Node.js 14+ and npm.

```bash
npm install
npm run dev
```

Open the URL shown in terminal, usually:

```text
http://localhost:5173/
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Try It Out

https://2300032592.github.io/delivery-insurance-fraud-detection/

## GitHub Repository

https://github.com/2300032592/delivery-insurance-fraud-detection