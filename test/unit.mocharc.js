module.exports = {
  diff: true,
  extension: ['js'],
  // package: './../package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  'watch-files': ['test/setup.js', 'test/unit/**/*.js', 'test/unit/**/**/*.js'],
  recursive: true,
};
