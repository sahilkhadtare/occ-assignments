module.exports = {
  name: 'oeAssignment9Sahil',
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(spec|test).js?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.{js,jsx}', '!**/node_modules/**', '!app/__tests__/testUtils/**'],
  coverageReporters: ['json', 'text']
};
