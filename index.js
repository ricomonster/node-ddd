const container = require('src/container');

const server = container.resolve('server');

server.start().catch((error) => {
  console.error(error.stack);
  process.exit();
});
