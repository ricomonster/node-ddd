const container = require('./src/container');

const httpServer = container.resolve('httpServer');
const logger = container.resolve('logger');

httpServer.start().catch((error) => {
  logger.error(error.stack);
  process.exit();
});
