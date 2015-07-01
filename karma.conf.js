var _ = require('lodash'),
    cwd = process.cwd(),
    OptionsParser = require('./lib/OptionsParser'),
    options = new OptionsParser().parse(),
    reporters = ['spec', 'junit'],
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
            transform: options.testTransforms,
            bundleDelay: 750
        },
        junitReporter: {
            outputFile: 'test-results.xml',
            suite: ''
        },
        preprocessors: preprocessors,
        coverageReporter: {
            dir: options.coverageOutput,
            reporters: [
                {type: 'html', subdir: '.'},
                {type: 'cobertura', subdir: '.', file: 'cobertura.xml'}
            ]
        },
        browserNoActivityTimeout: 3 * 60 * 1000
    });
};
