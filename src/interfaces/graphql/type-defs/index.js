// dependencies
const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, './'));
const typeDefs = mergeTypes(typesArray);

module.exports = typeDefs;
