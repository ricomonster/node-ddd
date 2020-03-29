// Dependencies
const fs = require('fs');
const inflection = require('inflection');
const path = require('path');

// Database
const { database } = require('./../database');

const singularizeToUpper = str => {
  return inflection.singularize(str.replace(/^./, f => f.toUpperCase()));
};

const modelList = {};

// get the models and associate it
fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = database.import(path.join(__dirname, file));
    const modelName = `${singularizeToUpper(file.split('.')[0])}Model`;
    modelList[modelName] = model;
  });

Object.keys(modelList).forEach(modelName => {
  if (modelList[modelName].associate) {
    modelList[modelName].associate({ models: modelList });
  }
});

module.exports = modelList;
