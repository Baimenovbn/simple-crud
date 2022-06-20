/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true,
  testMatch: [
      '**/__tests__/*.test.ts',
  ]
};