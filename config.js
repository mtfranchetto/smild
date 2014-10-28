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
                "autoprefixerRules": ["last 2 versions", "> 1%", "ie 8"],
                "coverage": smildOptions && smildOptions.module ? "lib/*" : "scripts/*",
                "coverageOutput": "coverage/",
                "runCoverage": true,
                "testLauncher": "PhantomJS",
                "testTransforms": ["browserify-shim", "browserify-istanbul"],
                "copyIndex": true,
                "expandDistribution": false,
                "bundleNoParse": []
            };

        return _.assign(defaultOptions, smildOptions);
    };
});

module.exports = Config;