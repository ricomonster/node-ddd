// Dependencies
const Sequelize = require('sequelize');

// Config
const config = require('./../../../config');

// Check if we have config
if (config && !config.db) {
  throw new Error('Database configuration not found.');
}

// instantiate sequelize
const database = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
});

module.exports = { database, sequelize: Sequelize };
