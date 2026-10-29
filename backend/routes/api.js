const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { requireAuth, optionalAuth, generationLimiter } = require('../middleware/auth');

// Authentication routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/auth/google', authController.googleAuth);

// User profile & tracking routes
router.post('/profile', optionalAuth, userController.saveProfile);
router.post('/log-progress', optionalAuth, userController.logProgress);

// AI & RAG Pipeline routes (Page 20 of PDF)
router.post('/ai/answer', optionalAuth, generationLimiter, userController.answerRAG);
router.post('/generate-plan', optionalAuth, generationLimiter, userController.generatePlan);
router.post('/chat', optionalAuth, generationLimiter, userController.chatWithAI);

// Corpus ingestion & verification routes (Pipeline A)
router.post('/ai/ingest', userController.ingestCorpusHandler);
router.get('/ai/corpus', userController.getCorpusHandler);

module.exports = router;
