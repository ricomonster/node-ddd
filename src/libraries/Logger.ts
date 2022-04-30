import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { v4 as uuidv4 } from 'uuid';

const { combine, timestamp, printf, splat, colorize } = format;

class Logger {
  protected requestId;
  protected winston: WinstonLogger = createLogger();

  constructor(requestId?: string) {
    this.requestId = requestId || uuidv4();

    this.winston = createLogger({
      format: combine(
        timestamp(),
        splat(),
        colorize(),
        printf((info => {
          return `${info.timestamp as string} [${this.requestId}]: ${info.message}`;
        }))
      ),
      transports: [new transports.Console()],
    });
  }

  /**
   * Logs in an info level
   *
   * @param {unknown} log
   * @returns {void}
   */
  public info(...log: unknown[]): void {
    this.winston.info(log);
  }

  /**
   * Logs in an error level
   */
  public error(...log: unknown[]): void {
    this.winston.error(log);
  }
}

export { Logger };
