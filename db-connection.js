const knex = require('knex');
const { config } = require('./index');
const logger = require('../utils/logger');

// Configure knex based on environment
const knexConfig = {
  client: 'pg',
  connection: config.DATABASE_URL || {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: '../migrations',
  },
  seeds: {
    directory: '../seeds',
  },
};

// Create the knex instance
const db = knex(knexConfig);

// Function to connect to the database
const connectDB = async () => {
  try {
    await db.raw('SELECT 1');
    logger.info('PostgreSQL database connected');
  } catch (error) {
    logger.error('Error connecting to PostgreSQL:', error.message);
    // Exit process with failure if we can't connect to the database
    process.exit(1);
  }
};

module.exports = { db, connectDB };
