require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();

// Updated CORS Policy to explicitly allow your deployed frontend
app.use(cors({
  origin: 'https://fitai-ivd5.onrender.com', // Aapka live frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

connectDB();
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
