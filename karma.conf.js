// Karma configuration
// Generated on Tue May 24 2016 11:50:35 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/lodash/*.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'include/angular-1.4.0/angular-translate.min.js',
      'include/angular-1.4.0/angular-cookies.min.js',
      'include/angular-1.4.0/angular-route.min.js',
      'include/angular-1.4.0/angular-resource.min.js',
      'include/angular-1.4.0/angular-translate-loader-static-files.min.js',
      'include/jquery-2.1.4/jquery-2.1.4.min.js',
      'include/bootstrap-select/js/*.js',
      'app.js',
      'config/config.js',
      'directives/**/*.js',
      'services/*.js',
      'tests/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/services/*.js':'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
