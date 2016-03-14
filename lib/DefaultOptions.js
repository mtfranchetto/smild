module.exports = function (module) {
    return {
        "module": false,
        "port": 5000,
        "liveReloadPort": 35729,
        "bundleFilename": "main",
        "distribution": "dist",
        "targets": "targets",
        "babel": {
            "extensions": [".es6", ".es"],
            "sourceMapRelative": "."
        },
        "styles": "styles",
        "test": "test/**/*",
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
        "revisionExclude": []
    };
};