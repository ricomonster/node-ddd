const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const hbs = require('express-hbs');

class Server {
  constructor({ config }) {
    this.app = express();
    this.config = config;
  }

  /**
   * Boots up the server
   */
  start() {
    // loadup the template engine
    // this.template();

    // enable the configuration of the server.
    this._configure();

    // start the server
    return new Promise((resolve) => {
      const http = this.app.listen(this.config.port || 3000, () => {
        const { port } = http.address();

        console.log(`API Running at port: ${port}`);
      });
    });
  }

  /**
   * Server Configurations
   */
  _configure() {
    // remove the Powered by Express header
    // this.app.disable('x-powered-by');

    // load up the router
    this.app.use(this._router());

    // Handle invalid requests
    // this.app.use((req, res) => {
    //   return res.status(404).json({ error: 'Not found' });
    // });

    // static folder
    // this.app.use(express.static('public'));
  }

  /**
   * Configures the routing
   */
  _router() {
    // Initialize router
    const router = express.Router();

    // Router configuration
    router.use(bodyParser.urlencoded({ extended: true }));

    // Enable logging for console
    // NOTE: This can be use also in other env's. Consider using it permanently
    if (this.config.env === 'development') {
      router.use(morgan('dev'));
    }

    // Check if we have controllers folder
    const controllersPath = path.resolve(__dirname, 'controllers');

    fs.readdirSync(controllersPath).forEach((file) => {
      // Skip if file is the BaseController or file does not have a Controller word
      if (
        file.indexOf('BaseController') > -1 ||
        file.indexOf('Controller') < 0 ||
        file.indexOf('.js') < 0
      ) {
        return false;
      }

      // let's require that file and instantiate it
      const controllerPath = path.resolve(controllersPath, file);
      const ControllerInstance = require(`${controllerPath}`);

      // Let's try to instantiate it
      try {
        const Controller = new ControllerInstance();

        // Check if has routes configuration
        if (typeof Controller.routes !== 'function') {
          throw new Error(`${Controller.constructor.name} does not have route configuration.`);
        }

        // Get the configuration and set it
        const { name: routeName, router: routes } = Controller.routes();

        router.use(routeName, routes);
      } catch (error) {
        // Skip if file is not a constructor
        if (error.message.indexOf('is not a constructor') > -1) {
          return false;
        }

        // Just show whatever error we encounter
        console.error(error);
      }
    });

    return router;
  }

  /**
   * Configures the template engine to use.
   *
   * @memberof Server
   */
  template() {
    // // set the template engine
    // this.app.engine(
    //   'html',
    //   hbs.express4({
    //     extname: '.html',
    //   })
    // );
    // // set the view engine
    // this.app.set('view engine', 'html');
    // // set the path of the templates
    // this.app.set('views', `${__dirname}/resources/views`);
  }
}

module.exports = Server;
