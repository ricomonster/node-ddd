// Function to test
import { Logger } from '../Logger';

describe('libraries/Logger', () => {
  let logger: Logger;

  beforeAll(() => {
    logger = new Logger();
  });

  it('should run a log info.', () => {
    const result = logger.info('Test info log.');
    expect(result).toBeUndefined();
  });

  it('should run an error info.', () => {
    const result = logger.error('Test error log.');
    expect(result).toBeUndefined();
  });
});
