class Application {
  constructor({ graphql, server }) {
    this.graphql = graphql;
    this.server = server;
  }

  start() {
    return this.server.start();
  }

  startGraphQL() {
    return this.graphql.start();
  }
}

module.exports = Application;
