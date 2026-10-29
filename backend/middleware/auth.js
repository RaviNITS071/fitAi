const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const JWT_SECRET = process.env.JWT_SECRET || 'fitai_jwt_dev_secret_2026_seimens';

/**
 * requireAuth middleware
 * Verifies JWT token in Authorization header and attaches decoded user to req.user
 */
function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. Missing or malformed authorization token.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authorization token.' });
  }
}

/**
 * Optional authentication middleware: attaches user if token exists, but doesn't block if absent
 */
function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      req.user = jwt.verify(token, JWT_SECRET);
    }
  } catch (e) {
    // Ignore invalid token in optional auth
  }
  next();
}

/**
 * Rate Limiter for GenAI calls (Page 20 & 23: bound retries and protect provider quota)
 */
const generationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Limit each IP to 60 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many AI generation requests from this IP. Please wait a few minutes before trying again.'
  }
});

module.exports = {
  requireAuth,
  optionalAuth,
  generationLimiter,
  JWT_SECRET
};
