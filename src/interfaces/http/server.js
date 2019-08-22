const express = require('express');

const Server = ({ logger, router }) => {
  const app = express();

  // this will remove the Powered by Express header thingy
  app.disable('x-powered-by');

  // load up the router
  app.use(router);

  // static folder
  app.use(express.static('public'));

  return {
    app,
    start: () => {
      return new Promise(() => {
        const http = app.listen('3000', () => {
          const { port } = http.address();

          logger.info(`API Running at Port: ${port}`);
        });
      });
    },
  };
};

module.exports = Server;
