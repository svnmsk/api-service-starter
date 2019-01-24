module.exports = {
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    collectCoverage: false,
    testEnvironment: 'node',
    testMatch: [
        '**/*.test.js'
    ],
};