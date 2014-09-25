var path = require('path'),
    _ = require('lodash');

var Config = new (function () {

    this.options = function () {
        var packageJson = require(path.join(process.cwd(), 'package.json')),
            smildOptions = packageJson.smild,
            defaultOptions = {
                "module": false,
                "serverPort": 5000,
                "bundleFilename": "main",
                "distribution": "dist",
                "bootstrappers": "boot",
                "test": "test/*",
                "coverage": smildOptions && smildOptions.module? "lib/*": "scripts/*",
                "coverageOutput": "coverage/",
                "runCoverage": true,
                "testLauncher": "PhantomJS",
                "testTransforms": ["browserify-shim", "browserify-istanbul"]
            };

        return _.assign(defaultOptions, smildOptions);
    };
});

module.exports = Config;