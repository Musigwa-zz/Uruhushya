module.exports = {
  displayName: 'Planner',
  verbose: true,
  preset: 'react-native',
  testMatch: ['**/?(*.)+(spec|test).js'],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  collectCoverage: true,
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
  ],
  setupFiles: [
    '<rootDir>/jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-clone-referenced-element|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|sentry-expo|native-base))',
  ],
};
