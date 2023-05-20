const jestConfig = {
    verbose: true,
    testEnvironmentOptions:{
        url: "http://localhost/5001",
    },  
    transform: {
      '^.+\\.js?$': 'babel-jest',
    },
    testMatch: [
        '**\\*amenity_test.js',
        '**\\*amenity_test.js',
        '**/*amenity_test.js',
        'src\\**\\*.amenity_test.js',
        'src/**/*.amenity_test.js',
        '<rootDir>\\src\\**\\*.amenity_test.js',
        '<rootDir>/src/**/*.amenity_test.js',
        'src/.*|(.|/)(.test).js?$'
      ],
  }
  
  module.exports = jestConfig
 