const jestConfig = {
    verbose: true,
    testEnvironmentOptions:{
        url: "http://localhost/5001",
    },  
    transform: {
      '^.+\\.js?$': 'babel-jest',
    },
    testMatch: [
        '**\\*employee-test.js',
        '**\\*employee-test.js',
        '**/*employee-test.js',
        'src\\**\\*.employee-test.js',
        'src/**/*.employee-test.js',
        '<rootDir>\\src\\**\\*.employee-test.js',
        '<rootDir>/src/**/*.employee-test.js',
        'src/.*|(.|/)(.test).js?$'
      ],
  }
  
  module.exports = jestConfig
 