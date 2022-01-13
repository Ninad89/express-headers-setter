// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    verbose: true,
    clearMocks: true,    
    collectCoverage :true,
    testMatch:['**/src/*.spec.ts'],    
    //coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
    collectCoverageFrom:[
      'src/**/*.ts'
    ],
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: [
        // "json",
        'text',
        "lcov",
        // "clover"
    ],
    // An object that configures minimum threshold enforcement for coverage results
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },    
    testEnvironment: 'node',    
};
