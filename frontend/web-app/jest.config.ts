import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest' // Use babel-jest for JSX support
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // mock next-auth and next-auth/providers/credentials
    'next-auth/providers/credentials':
      '<rootDir>/__mocks__/next-auth-credentials.ts',
    'next-auth': '<rootDir>/__mocks__/next-auth.ts'
  }
};

export default createJestConfig(config);
