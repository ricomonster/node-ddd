const express = require('express');
const hbs = require('express-hbs');

class Server {
  constructor({ config, logger, router }) {
    this.app = express();
    this.config = config;
    this.logger = logger;
    this.router = router;
  }

  /**
   * Server Configurations
   */
  configure() {
    // remove the Powered by Express header
    this.app.disable('x-powered-by');

    // load up the router
    this.app.use(this.router);

    // static folder
    this.app.use(express.static('public'));
  }

  /**
   * Boots up the server
   */
  start() {
    // loadup the template engine
    this.template();

    // enable the configuration of the server.
    this.configure();

    // start the server
    return new Promise(resolve => {
      const http = this.app.listen(this.config.port, () => {
        const { port } = http.address();

        this.logger.info(`API Running at port: ${port}`);
      });
    });
  }

  /**
   * Configures the template engine to use.
   *
   * @memberof Server
   */
  template() {
    // set the template engine
    this.app.engine(
      'html',
      hbs.express4({
        extname: '.html',
      })
    );

    // set the view engine
    this.app.set('view engine', 'html');

    // set the path of the templates
    this.app.set('views', `${__dirname}/resources/views`);
  }
}

module.exports = Server;
