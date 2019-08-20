// dependencies
const path = require('path');

const CreateControllerRoutes = uri => {
  const controllerPath = path.resolve('src/interfaces/http', uri);
  const Controller = require(controllerPath);

  return new Controller();
};

module.exports = CreateControllerRoutes;
