require('dotenv').config();

// dependencies
const fs = require('fs');
const path = require('path');

// This will fix the expected env values
const env = require('./env');

const loadDatabaseConfig = () => {
  // check if the database config exists
  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }

  // throw an error
  throw new Error('Database configuration is required.');
};

const ENV = env(process.env.NODE_ENV || 'development');

// load up the database configuration
const dbConfig = loadDatabaseConfig();

// setup the config
const config = {
  env: ENV,
  db: dbConfig,
  jwt: {
    secret: process.env.APP_KEY,
    ttl: process.env.APP_JWT_TTL,
  },
  debug: process.env.APP_DEBUG === 'true' ? true : false,
  port: process.env.APP_PORT,
};

module.exports = config;
