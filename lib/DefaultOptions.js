var path = require('path');

module.exports = function (module) {
    return {
        "module": false,
        "port": 5000,
        "liveReloadPort": 35729,
        "bundleFilename": "main",
        "distribution": "dist",
        "targets": "targets",
        "babel": {
            "presets": [
                path.resolve(__dirname, "../node_modules/babel-preset-es2015"),
                path.resolve(__dirname, "../node_modules/babel-preset-stage-1")
            ],
            "plugins": [
                path.resolve(__dirname, "../node_modules/babel-plugin-syntax-async-generators")
            ]
        },
        "styles": "styles",
        "test": "test/**/*",
        "images": "images",
        "views": "views",
        "assets": "assets",
        "autoprefixerRules": ["last 2 versions", "> 1%"],
        "scripts": module ? "lib/*" : "scripts/*",
        "preBuild": [], // { source: "", ext: "", dest: ""}
        "postBuild": [], // { source: "", ext: "", dest: ""}
        "manifest": null,
        "revisionExclude": []
    };
};