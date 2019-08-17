// dependencies
const sequelize = require('./../sequelize');

const Database = ({ config, logger }) => {
  console.log('ccc', config);

  if (!config.db) {
    logger.error('Database configuration not found. Database will not load up.');
    return false;
  }

  return sequelize({ config, basePath: __dirname });
};

module.exports = Database;
