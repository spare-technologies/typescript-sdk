module.exports = {
    coverageReporters: ['text', 'lcov'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageProvider: 'v8',
    reporters: ['default', 'jest-junit'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    "globals": {
        "ts-jest": {
            "tsconfig": "./tsconfig.spec.json"
        }
    },
    roots: ['spec'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};
