// Dependencies
const path = require('path');

// This will fix the expected env values
const env = require('./env');

// get the path of the .env
const dotEnvPath = path.resolve('.env');

// load up the env
require('dotenv').config({ path: dotEnvPath });

module.exports = {
  [env(process.env.NODE_ENV)]: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
};
