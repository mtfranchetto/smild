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
                "styles": "styles",
                "test": "test/*",
                "images": "images",
                "views": "views",
                "assets": "assets",
                "externalTestFiles": [],
                "autoprefixerRules": ["last 2 versions", "> 1%", "ie 8"],
                "coverage": smildOptions && smildOptions.module ? "lib/*" : "scripts/*",
                "analysis": smildOptions && smildOptions.module ? "lib/*" : "scripts/*",
                "coverageOutput": "coverage/",
                "analysisOutput": "analysis/",
                "runCoverage": true,
                "testLauncher": "PhantomJS",
                "testTransforms": [],
                "preBuild": [], // { source: "", ext: "", dest: ""}
                "postBuild": [], // { source: "", ext: "", dest: ""}
                "manifest": null,
                "revisionExclude": [],
                "jshint": {
                    "node": true,
                    "browser": true,
                    "esnext": true,
                    "bitwise": true,
                    "camelcase": true,
                    "curly": true,
                    "eqeqeq": true,
                    "immed": true,
                    "indent": 2,
                    "latedef": true,
                    "newcap": true,
                    "noarg": true,
                    "quotmark": "single",
                    "regexp": true,
                    "undef": true,
                    "unused": true,
                    "strict": true,
                    "trailing": true,
                    "smarttabs": true
                }
            };

        return _.assign(defaultOptions, smildOptions, {
            projectPackage: packageJson
        });
    };
});

module.exports = Config;