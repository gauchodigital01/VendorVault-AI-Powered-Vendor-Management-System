const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const { config } = require('./config');
const logger = require('./utils/logger');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');

// Route imports
const authRoutes = require('./routes/auth');
const vendorRoutes = require('./routes/vendors');
const contractRoutes = require('./routes/contracts');
const documentsRoutes = require('./routes/documents');
const analyticsRoutes = require('./routes/analytics');
const usersRoutes = require('./routes/users');

// Middleware imports
const { errorHandler } = require('./middleware/errorHandler');
const { authenticateJWT } = require('./middleware/auth');

// Initialize express app
const app = express();
const PORT = config.PORT || 5000;

// Connect to database
connectDB();

// Connect to Redis if enabled
if (config.REDIS_ENABLED) {
  connectRedis();
}

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan(config.NODE_ENV === 'development' ? 'dev' : 'combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(compression()); // Compress responses

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', authenticateJWT, vendorRoutes);
app.use('/api/contracts', authenticateJWT, contractRoutes);
app.use('/api/documents', authenticateJWT, documentsRoutes);
app.use('/api/analytics', authenticateJWT, analyticsRoutes);
app.use('/api/users', authenticateJWT, usersRoutes);

// Serve static assets in production
if (config.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`VendorVault API running on port ${PORT} in ${config.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // Close server & exit process
  // server.close(() => process.exit(1));
});

module.exports = app; // For testing purposes
