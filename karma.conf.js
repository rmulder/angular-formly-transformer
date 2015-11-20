const path = require('path');
const webpackConfig = require('./webpack.config.js');
const entry = path.join(webpackConfig.context, webpackConfig.entry);
const preprocessors = {};
preprocessors[entry] = ['webpack'];
preprocessors['tests/client/formly-transformer-spec.js'] = ['babel'];

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-babel-preprocessor'
        ],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/api-check/dist/api-check.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-formly/dist/formly.js',
            'node_modules/angular2-now/angular2-now.js',
            entry,
            'tests/client/formly-transformer-spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: preprocessors,


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        webpack: webpackConfig,
        webpackMiddleware: {noInfo: true},
        coverageReporter: {
            reporters: [
                {type: 'lcov', dir: 'coverage/', subdir: '.'},
                {type: 'text-summary'}
            ]
        },


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
        // how many browser should be started simultanous
        concurrency: Infinity
    })
};
