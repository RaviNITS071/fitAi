# ⚡ FitAI — AI-Powered Fitness & Clinical Nutrition Platform

> An evidence-based, sports-science athletic platform powered by **LangChain.js**, **OpenAI Embeddings**, and **MongoDB Atlas Vector Search (RAG)** to generate clinically safe workout splits, macro-calibrated Indian nutrition plans, and 24/7 AI coaching.

<p align="left">
  <a href="https://fitai-qk6c.onrender.com" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-fitai--qk6c.onrender.com-22C55E?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://fitai-backend-jxsv.onrender.com/api/health" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/⚡%20Backend%20API-online-0F172A?style=for-the-badge&logo=node.js&logoColor=white" alt="Backend API" />
  </a>
  <img src="https://img.shields.io/badge/Tests-29%2F29_Passing-10B981?style=for-the-badge&logo=jest&logoColor=white" alt="Tests Passing" />
</p>

---

## 🌐 Live Deployments (Opens Directly in Browser)

- 🔗 **Production Frontend:** <a href="https://fitai-qk6c.onrender.com" target="_blank" rel="noopener noreferrer">**https://fitai-qk6c.onrender.com** ↗</a>
- ⚙️ **Production Backend API:** <a href="https://fitai-backend-jxsv.onrender.com" target="_blank" rel="noopener noreferrer">https://fitai-backend-jxsv.onrender.com ↗</a>
- 🩺 **API Health Check:** <a href="https://fitai-backend-jxsv.onrender.com/api/health" target="_blank" rel="noopener noreferrer">https://fitai-backend-jxsv.onrender.com/api/health ↗</a>

---

## 💡 What Makes FitAI Different?

Generic LLMs frequently hallucinate dangerous training splits, impractical diets, or contraindicated exercises for athletes with injuries. 

**FitAI solves this by implementing a verified Retrieval-Augmented Generation (RAG) pipeline:**
- **Evidence-Grounded:** Every routine, calorie recommendation, and safety guideline is grounded in an approved sports-science corpus with traceable source citations (`[S1, S2]`).
- **Allergen & Medical Safeguards:** Automatically detects conditions like lower back sensitivity (substituting spinal axial-loading exercises with joint-sparing movements) and strictly excludes food allergens.
- **Zero-Downtime Resilience:** Features an automated graceful fallback engine that ensures continuous generation even if third-party LLM rate limits (HTTP 429) occur.
- **Authentic Indian Nutrition:** Calibrated meal plans with metric units (grams, katoris, rotis) built for vegetarian, eggetarian, and non-vegetarian lifestyles.

---

## 🧠 LangChain.js & RAG Architecture

FitAI uses a two-pipeline retrieval architecture to ensure factual accuracy and sub-second generation speed:

```
[ PIPELINE A: Corpus Ingestion (Pre-computation) ]
  Sports Science Knowledge Base (.js)
      │
      ▼
  RecursiveCharacterTextSplitter (chunkSize: 1000, overlap: 150)
      │
      ▼
  OpenAI text-embedding-3-small (1536-dimensional vectors)
      │
      ▼
  MongoDB Atlas Vector Store ("chunks" collection + metadata)


[ PIPELINE B: Request-Time Retrieval & Synthesis ]
  User Biometrics & Objectives (Age, Weight, Goal, Medical Restrictions)
      │
      ▼
  Query Vectorization (1536 dims)
      │
      ▼
  MongoDB Atlas $vectorSearch (Filtered by goal: strength | endurance | general)
      │
      ▼
  Top-K Evidence Retrieval (K=4) + Insufficient Context Gating
      │
      ▼
  Structured Prompt with Evidence Blocks [S1, S2, ...]
      │
      ▼
  ChatOpenAI withStructuredOutput(ZodSchema)
      │
      ▼
  Grounded 6-Day Athlete Split + Indian Macros + Verifiable Citations
```

### Key RAG Engineering Highlights
1. **Goal-Based Metadata Filtering:** RAG retrievals filter vectors by domain (`strength`, `endurance`, or `general`), eliminating cross-domain noise.
2. **Insufficient Context Gating:** If no relevant sports-science evidence matches a query, generation halts safely with `status: "insufficient_context"` rather than making up answers.
3. **Structured Type Safety:** Uses LangChain's `withStructuredOutput(ZodSchema)` to ensure zero markdown syntax leaks and predictable JSON contracts.
4. **Hybrid Search Fallback:** Automatically switches between MongoDB Atlas `$vectorSearch` and exact in-memory cosine ranking during local offline testing.

---

## ✨ Core Features

| Feature | Description | Direct Live Route |
| :--- | :--- | :--- |
| **🏋️ RAG Plan Generator** | Generates 6-day split (Push/Pull/Legs/Rest), Indian macro meals, and injury precautions with citations. | `POST /api/generate-plan` |
| **🥗 Macro Calculator** | Clinical Mifflin-St Jeor TDEE energy calculator with calibrated Indian food database (paneer, soya, dal). | <a href="https://fitai-qk6c.onrender.com/nutrition" target="_blank" rel="noopener noreferrer">Live Nutrition ↗</a> |
| **⏱️ Exercise Library & Rest Timer** | Biomechanical form standards with an interactive rest interval timer (45s, 60s, 90s, 120s). | <a href="https://fitai-qk6c.onrender.com/workouts" target="_blank" rel="noopener noreferrer">Live Workouts ↗</a> |
| **🤖 24/7 AI Coach Studio** | Context-aware sports trainer with conversational memory and hands-free Web Speech voice synthesis. | <a href="https://fitai-qk6c.onrender.com/coach" target="_blank" rel="noopener noreferrer">Live Coach ↗</a> |
| **📈 Daily Progress Tracking** | Daily weight trends, hydration tracking, and smart recovery alerts based on sleep hours. | <a href="https://fitai-qk6c.onrender.com/dashboard" target="_blank" rel="noopener noreferrer">Live Dashboard ↗</a> |
| **🔒 Google OAuth & JWT** | Secure Google Sign-In via Google Identity Services (GIS), bcrypt password hashing, and 7-day JWT tokens. | <a href="https://fitai-qk6c.onrender.com/login" target="_blank" rel="noopener noreferrer">Live Login ↗</a> |
| **🎨 Athlete Design System** | Clean "Professional Athlete Dashboard" inspired by Apple Health & Strava (Inter/Manrope typography, 8px grid). | Tailwind System |

---

## 🛠️ Complete Tech Stack

```
Frontend:    React 19 • React Router DOM v7 • Tailwind CSS • Lucide React • Axios • Vite
Backend:     Node.js • Express.js • Mongoose • JWT • Google Auth Library • Express Rate Limit
GenAI & RAG: LangChain.js • OpenAI Embeddings • ChatOpenAI • Gemini Flash Fallback • Zod
Database:    MongoDB Atlas (Cloud Cluster) • Atlas Vector Search ($vectorSearch)
DevOps:      Render (Static Site + Web Service) • Git CI/CD • render.yaml Blueprint
```

---

## 🚀 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/<YOUR-USERNAME>/fitAi.git
cd fitAi
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.yue5qgi.mongodb.net/
JWT_SECRET=your_secret_jwt_key
OPENAI_API_KEY=sk-proj-...
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-secret
```

Start the backend server:
```bash
npm run dev
# Server running on http://localhost:5000
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

Start the frontend development server:
```bash
npm run dev
# Vite dev server running on http://localhost:5173
```

---

## 🧪 Automated Testing

FitAI includes an automated test suite verifying RAG contracts, cosine ranking, text chunking, and injection security:

```bash
cd backend
npm test
```

```text
PASS tests/integration.test.js
PASS tests/rag-evaluation.test.js
PASS tests/chunking.test.js
PASS tests/rag-contracts.test.js
PASS tests/security-injection.test.js
PASS tests/cosine.test.js

Test Suites: 6 passed, 6 total
Tests:       29 passed, 29 total
Time:        3.12 s
```

---

## ☁️ Deployment Architecture on Render

FitAI is deployed on Render using a two-tier configuration:

1. **Backend Web Service (`fitai-backend`):**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check: `/api/health`
2. **Frontend Static Site (`fitai-frontend`):**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - **SPA Routing Rewrite Rule:** `/*` ➔ `/index.html` (Rewrite)
3. **Automated Blueprint (`render.yaml`):**
   - The root [`render.yaml`](render.yaml) automatically provisions both services with environment variables and rewrite rules in one click via Render Blueprints.

---

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).
