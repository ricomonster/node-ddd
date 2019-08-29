// dependencies
const path = require('path');

const CreateControllerRoutes = uri => {
  const controllerPath = path.resolve('src/interfaces/http/controllers', uri);
  const Controller = require(controllerPath);

  return new Controller().routes();
};

module.exports = CreateControllerRoutes;
