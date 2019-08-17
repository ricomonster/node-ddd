// dependencies
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const SequelizeInfra = ({ config, basePath }) => {
  // instantiate sequelize
  const sequelize = new Sequelize(config.db.host, { ...config });

  // setup db
  const db = {
    sequelize,
    Sequelize,
    models: {},
  };

  // TODO: get the models and associate it

  return db;
};

module.exports = SequelizeInfra;
