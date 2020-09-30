// Dependencies
const Sequelize = require('sequelize');

// Config
const config = require('./../../../config');

// Check if we have config
if (config && !config.db) {
  throw new Error('Database configuration not found.');
}

// Extract
const { database, username, password, port, dialect, host } = config.db;

// Instantiate sequelize
const sequelizeDb = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  logging: config.debug ? console.log : false,
});

module.exports = { database: sequelizeDb, sequelize: Sequelize };
