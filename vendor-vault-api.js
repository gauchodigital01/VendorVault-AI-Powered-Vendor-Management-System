// server.js - Main entry point for the Express application

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const vendorRoutes = require('./routes/vendors');
const contractRoutes = require('./routes/contracts');
const analyticsRoutes = require('./routes/analytics');
const { authenticateJWT } = require('./middleware/auth');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', authenticateJWT, vendorRoutes);
app.use('/api/contracts', authenticateJWT, contractRoutes);
app.use('/api/analytics', authenticateJWT, analyticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`VendorVault API running on port ${PORT}`);
});
