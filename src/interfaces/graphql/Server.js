// dependencies
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { createContext } = require('dataloader-sequelize');
const express = require('express');

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
    const { config, database, logger } = this.container;

    // dataloader
    const sequelizeContext = createContext(database.sequelize);

    // build up the graphql server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        operations: this.container,
        sequelize: sequelizeContext,
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
        logger.info(
          `GraphQL server running at http://localhost:${config.port}${server.graphqlPath}`
        );
      });
    });
  }
}

module.exports = Server;
