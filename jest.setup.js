// jest.setup.js
module.exports = {
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy', // Mocking all CSS imports
    },
  };
// Polyfill ReadableStream for Node.js environment
global.ReadableStream = require('stream').Readable;

// If you use node-fetch in your code, polyfill it too
global.fetch = require('node-fetch');
global.Response = fetch.Response;  // Mock the Response object


// Mock the Firebase Analytics module to prevent errors during testing
jest.mock('firebase/analytics', () => ({
    getAnalytics: jest.fn(() => ({
      logEvent: jest.fn(),
    })),
    initializeAnalytics: jest.fn(),
    setAnalyticsCollectionEnabled: jest.fn(),
    isSupported: jest.fn().mockReturnValue(false),
  }));
  
  // Polyfill TextEncoder and TextDecoder for Jest tests
global.TextEncoder = require('text-encoding').TextEncoder;
global.TextDecoder = require('text-encoding').TextDecoder;
