var _ = require('lodash'),
    cwd = process.cwd(),
    options = require('./config').options(),
    reporters = ['progress'],
    preprocessors = {},
    files = _.flatten([{pattern: options.test}, options.externalTestFiles]);

preprocessors[options.test] = ['browserify'];
preprocessors[options.coverage] = ['coverage'];

if (options.runCoverage)
    reporters.push('coverage');

module.exports = function (config) {
    config.set({
        basePath: cwd,
        frameworks: ['jasmine', 'browserify'],
        files: files,
        reporters: reporters,
        port: 9876,
        runnerPort: 9100,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: [options.testLauncher],
        captureTimeout: 60000,
        singleRun: false,
        browserify: {
            watch: true,
            debug: true,
            transform: options.testTransforms
        },
        preprocessors: preprocessors,
        coverageReporter: {
            type: 'html',
            dir: options.coverageOutput
        }
    });
};
