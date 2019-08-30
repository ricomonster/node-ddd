// dependencies
const path = require('path');

// get the path of the .env
const dotEnvPath = path.resolve('.env');

// load up the env
require('dotenv').config({ path: dotEnvPath });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
};
