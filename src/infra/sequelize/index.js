// dependencies
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const SequelizeInfra = ({ config, basePath }) => {
  // instantiate sequelize
  const sequelize = new Sequelize({ ...config.db });

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
    db.models[model.name] = model;
  });

  return db;
};

module.exports = SequelizeInfra;
