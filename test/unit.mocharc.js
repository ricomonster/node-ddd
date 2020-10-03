module.exports = {
  diff: true,
  extension: ['js'],
  reporter: 'spec',
  slow: 1000,
  timeout: 2000,
  'watch-files': ['test/setup.js', 'test/unit/**/*.js', 'test/unit/**/**/*.js'],
  recursive: true,
};
