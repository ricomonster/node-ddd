const env = (environment) => {
  switch (environment) {
    case 'prod':
    case 'production':
      return 'production';

    case 'testing':
    case 'test':
    case 'testbed':
      return 'test';

    case 'local':
    case 'dev':
    case 'develop':
    case 'development':
    default:
      return 'development';
  }
};

module.exports = env;
