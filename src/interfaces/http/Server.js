const express = require('express');
const Status = require('http-status');

// Routes
const routes = require('./routes');

class Server {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger;

    this.app = express();
    this.http = {};
  }

  /**
   * Setup the configuration of the HTTP Server.
   *
   * @memberof Server
   */
  configuration() {
    // Load up the route configurations
    this.app.use(routes());

    // Handle invalid requests
    this.app.use((req, res) => res.status(Status.NOT_FOUND).json({ error: 'Not found' }));
  }

  /**
   * This will start the Express HTTP Server.
   *
   * @return {Promise}
   * @memberof Server
   */
  start() {
    // Load up the configuration
    this.configuration();

    return new Promise(() => {
      this.http = this.app.listen(this.config.app.port || 3000, () => {
        const { port } = this.http.address();

        this.logger.info(`HTTP running at port ${port}`);
      });
    });
  }

  /**
   * This will stop the Express HTTP Server Instance.
   *
   * @return {Boolean|void}
   * @memberof Server
   */
  stop() {
    if (!this.http || !this.http.close) {
      return false;
    }

    return this.http.close();
  }
}

module.exports = Server;
