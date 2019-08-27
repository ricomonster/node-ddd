// dependencies
const fs = require('fs');
const winston = require('winston');

// check if it exists
if (!fs.existsSync(`logs`)) {
  // create it
  fs.mkdirSync(`logs`);
}

const Logger = ({ config }) => {
  return new winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File(
        Object.assign(config.debug, {
          filename: `logs/development.log`,
        })
      ),
    ],
  });
};

module.exports = Logger;
