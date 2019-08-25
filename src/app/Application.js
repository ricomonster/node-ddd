class Application {
  constructor({ server }) {
    this.server = server;
  }

  start() {
    return this.server.start();
  }

  startGraphQL() {}
}

module.exports = Application;
