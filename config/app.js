require('dotenv').config();

module.exports = {
  name: process.env.APP_NAME || 'NodeJS DDD',
  env: process.env.NODE_ENV || 'production',
  debug: process.env.APP_DEBUG || false,
  url: process.env.APP_URL || 'http://localhost',
  timezone: 'UTC',
  key: process.env.APP_KEY || 'RandomString',
  port: process.env.APP_PORT || 3000,
};
