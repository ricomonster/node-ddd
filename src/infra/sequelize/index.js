// dependencies
const fs = require('fs');
const inflection = require('inflection');
const path = require('path');
const Sequelize = require('sequelize');

const singularizeToUpper = str => {
  return inflection.singularize(str.replace(/^./, f => f.toUpperCase()));
};

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
  fs.readdirSync(path.join(basePath, './models'))
    .filter(file => {
      return file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js';
    })
    .forEach(file => {
      const model = sequelize.import(path.join(basePath, './models', file));
      const modelName = `${singularizeToUpper(file.split('.')[0])}Model`;
      db.models[modelName] = model;
    });

  Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
      db.models[modelName].associate(db);
    }
  });

  return db;
};

module.exports = SequelizeInfra;
