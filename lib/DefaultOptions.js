module.exports = function (module) {
    return {
        "module": false,
        "port": 5000,
        "bundleFilename": "main",
        "distribution": "dist",
        "targets": "targets",
        "styles": "styles",
        "test": "test/*",
        "images": "images",
        "views": "views",
        "assets": "assets",
        "externalTestFiles": [],
        "autoprefixerRules": ["last 2 versions", "> 1%"],
        "scripts": module ? "lib/*" : "scripts/*",
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
            "indent": 4,
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
};