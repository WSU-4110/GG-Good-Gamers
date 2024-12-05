module.exports = {
  // Other Jest configurations
  testEnvironment: 'jsdom',  // Make sure Jest uses jsdom for browser-like behavior
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Ensure you have a setup file for mocks

  // Mock CSS and other static file imports
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Mock CSS imports
  },

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Optional: Handle files in node_modules if necessary
  transformIgnorePatterns: [
    '/node_modules/(?!axios|some-other-esm-package)/'
  ],
};
