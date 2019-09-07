// dependencies
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

// graphql schemas
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');

class Server {
  constructor(container) {
    this.app = express();
    this.container = container;
  }

  start() {
    const { app } = this;
    const { config, logger } = this.container;

    // build up the graphql server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        operations: this.container,
        ...req,
      }),
    });

    // setup cors
    app.use(cors());

    // set middlewares
    server.applyMiddleware({ app, path: config.graphqlEndpoint, cors: false });

    // run the server
    return new Promise(() => {
      app.listen({ port: config.port }, () => {
        logger.info(`GraphQL server running at http://localhost:3000${server.graphqlPath}`);
      });
    });
  }
}

module.exports = Server;
