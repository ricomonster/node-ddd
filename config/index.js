require('dotenv').config();

// dependencies
const fs = require('fs');
const path = require('path');

const loadDatabaseConfig = () => {
  // check if the database config exists
  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }

  // throw an error
  throw new Error('Database configuration is required.');
};

const ENV = process.env.APP_ENV || 'development';

// load up the database configuration
const dbConfig = loadDatabaseConfig();

// setup the config
const config = Object.assign({
  env: ENV,
  db: dbConfig,
});

module.exports = config;
