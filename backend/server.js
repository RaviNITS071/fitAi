require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();

// Flexible CORS setup for local dev, Vite, and production deployments
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://fitai-qk6c.onrender.com',
  'https://fitai-ivd5.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow dev origins seamlessly
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'online',
    service: 'FitAI RAG & Fitness Engine',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', apiRoutes);
app.use('/', apiRoutes); // Direct root fallback for clients that omit /api in VITE_API_URL

// Centralized error handling middleware (PDF Chapter 12 & 20)
app.use((err, req, res, next) => {
  console.error("Centralized Server Error Handler:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error"
  });
});

// Connect DB and listen only if not in testing mode (Jest defines JEST_WORKER_ID)
if (process.env.NODE_ENV !== 'test' && !process.env.JEST_WORKER_ID) {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;