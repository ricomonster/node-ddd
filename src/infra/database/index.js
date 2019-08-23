// dependencies
const sequelize = require('src/infra/sequelize');

const Database = ({ config, logger }) => {
  if (!config.db) {
    logger.error('Database configuration not found. Database will not load up.');
    return false;
  }

  return sequelize({ config, basePath: __dirname });
};

module.exports = Database;
