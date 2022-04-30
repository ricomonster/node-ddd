module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**'],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/config/",
    "<rootDir>/src/shared/infrastructure/database/migrations/",
    "<rootDir>/src/shared/infrastructure/database/seeds/"
  ],
  coverageThreshold: {
    global: {
      lines: 90
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  setupFiles: [
    "<rootDir>/config/jest/setup.ts"
  ],
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*(test|spec))\\.[jt]sx?$',
  verbose: true
};
