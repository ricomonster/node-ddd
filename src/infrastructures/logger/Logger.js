const winston = require('winston');

class Logger {
  constructor() {
    // Winston Configuration
    const logConfiguration = {
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => `[${info.level}]${[info.timestamp]}: ${info.message}`)
      ),
    };

    this.log = winston.createLogger(logConfiguration);
  }

  /**
   * Logs error message to the console by default.
   *
   * @param {Object|Array|String} payload
   * @return {winston}
   * @memberof Logger
   */
  error(payload) {
    return this.log.error(payload);
  }

  /**
   * Logs info message to the console by default.
   *
   * @param {Object|Array|String} payload
   * @return {winston}
   * @memberof Logger
   */
  info(payload) {
    return this.log.info(payload);
  }
}

module.exports = Logger;
