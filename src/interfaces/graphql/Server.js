// dependencies
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// graphql schemas
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');

class Server {
  constructor({ config, logger }) {
    this.app = express();
    this.config = config;
    this.logger = logger;
  }

  start() {
    const { app } = this;

    // build up the graphql server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // set middlewares
    server.applyMiddleware({ app, path: this.config.graphqlEndpoint });

    // run the server
    return new Promise(() => {
      app.listen({ port: this.config.port }, () => {
        this.logger.info(`GraphQL server running at http://localhost:3000${server.graphqlPath}`);
      });
    });
  }
}

module.exports = Server;
