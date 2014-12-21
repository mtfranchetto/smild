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
                "images": "images",
                "views": "views",
                "assets": "assets",
                "externalTestFiles": [],
                "autoprefixerRules": ["last 2 versions", "> 1%", "ie 8"],
                "coverage": smildOptions && smildOptions.module ? "lib/*" : "scripts/*",
                "coverageOutput": "coverage/",
                "runCoverage": true,
                "testLauncher": "PhantomJS",
                "testTransforms": ["browserify-shim", "browserify-istanbul"],
                "copyIndex": true,
                "bundleNoParse": [],
                "preBuild": [], // { source: "", ext: "", dest: ""}
                "postBuild": [] // { source: "", ext: "", dest: ""}
            };

        return _.assign(defaultOptions, smildOptions);
    };
});

module.exports = Config;