const path = require('path'),
    ProjectType = require('./ProjectType');

module.exports = projectType => {
    projectType = projectType || ProjectType.FRONTEND;
    return {
        "projectType": projectType,
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
        "typescript": false,
        "styles": "styles",
        "test": "test/**/*",
        "images": "images",
        "views": "views",
        "assets": "assets",
        "autoprefixerRules": ["last 2 versions", "> 1%"],
        "scripts": projectType === ProjectType.FRONTEND ? "lib/*" : "scripts/*",
        "manifest": null,
        "revisionExclude": [],
        "onPreBuild": [],
        "onPostBuild": [],
        "onRebundle": []
    };
};