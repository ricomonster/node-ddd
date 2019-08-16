const express = require('express');

const Server = ({ router }) => {
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
      new Promise(resolve => {
        const http = app.listen('3000', () => {
          const { port } = http.address();

          console.log(`API Running at Port: ${port}`);
        });
      });
    },
  };
};

module.exports = Server;
