// dependencies
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const SequelizeInfra = ({ config, basePath }) => {
  // instantiate sequelize
  const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
  });

  // setup db
  const db = {
    sequelize,
    Sequelize,
    models: {},
  };

  // get the models and associate it
  const dir = path.join(basePath, './models');
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    db.models[`${model.name}Model`] = model;
  });

  return db;
};

module.exports = SequelizeInfra;
