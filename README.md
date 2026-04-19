# Predictive Electoral Intelligence Platform (PEIP) 🛰️

### Architectural Overview & Decision Record
**Author:** Senior Systems Architect / Aegis Intelligence Network  
**Version:** 4.5.2 (Production Release)

---

## 🏗️ System Architecture

This platform is a full-stack **Decision Intelligence System** designed to model political outcomes through a multi-factor weighted matrix. It leverages a modern, decoupled architecture with high-performance visualization.

### Backend Strategy (Secure Operational Node)
- **Engine**: Node.js / Express.js
- **Auth Architecture**: Stateless JWT (JSON Web Tokens) with **HTTP-Only Cookie** persistence. This was chosen to mitigate XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery) risks, ensuring session integrity at the browser level.
- **Data Persistence**: MongoDB (Mongoose ODM). Chosen for its flexible schema, allowing for rapid iteration of candidate demographic factors (Caste, Religion, OSINT Sentiment).
- **Security Logic**: Bcrypt.js hashing with SALT factor of 10. Express-validator middleware for strict input sanitization.

### Frontend Strategy (Tactical Visualization Layer)
- **Framework**: React.js (Vite runtime for optimized HMR).
- **Design System**: A custom-engineered **Glassmorphic UI** built on Vanilla CSS and Tailwind primitives. Utilizes `backdrop-filter` for depth and a refined dark-mode palette for analyst focus.
- **Animation Engine**: Framer Motion. Implemented to provide "Cinematic UX" — staggered list transitions and predictive state visualizations that enhance user confidence in the data.
- **Charting**: React-Chartjs-2. High-density probability distribution charts for real-time outcome modeling.

---

## 🧠 The Analytics Engine

The core value of PEIP lies in its proprietary **Strategic Matrix Model**:

1.  **Weighted Power Index**: Unlike basic scoring, PEIP uses a weighted distribution across 7+ factors (Organization Strength, Track Record, Personal Base, etc.).
2.  **Stochastic Outcome Modeler**: Calculates the **Probability of Win (PoW)** by evaluating the relative power index of all active subjects in a given field.
3.  **Threat Intelligence Analysis**: Automated **Gap Detection** that identifies strategic vulnerabilities (e.g., Sentiment dips or Anti-Incumbency spikes) and flags them for high-priority review.

---

## 🛠️ Operational Setup

### 1. External Dependencies
- Node.js (LTS recommended)
- MongoDB Atlas (Cloud Instance)

### 2. Environment Configuration
Create a `.env` in the `/Backend` directory:
```env
PORT=5001
MONGO_URI=your_secure_db_connection
JWT_SECRET=high_entropy_secret_key
```

### 3. Deployment Flow
```bash
# Initialize Intelligence Backend
cd Backend
npm install
npm start

# Initialize Tactical Frontend
cd Frontend
npm install
npm run dev
```

---

## 📂 Codebase Topography

```text
Electoral Analytics/
├── Backend/
│   ├── controllers/     # Business Logic & CRUD Orchestration
│   ├── middleware/      # Auth Guard & Security Interceptors
│   ├── utils/           # The Analytics Engine (Scoring, Gaps, PoW)
│   └── server.js        # Service Entry Point
├── Frontend/
│   ├── src/
│   │   ├── components/  # Atomic UI (Matrix, Charts, Gaps)
│   │   ├── pages/       # Higher-Order Route Components
│   │   └── index.css    # Global Design Tokens & Glass Utilities
└── README.md            # System Documentation
```

---

## 🛡️ Security Posture
The platform implements a "Secure-by-Design" approach. All API routes are guarded by a JWT middleware that validates tokens directly from HTTP-only cookies, preventing token leakage. CORS is strictly whitelisted to specific operational origins.

---
**PEIP // Mission-Critical Political Analytics // 2026**
