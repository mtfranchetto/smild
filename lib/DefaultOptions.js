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
        "babel": {},
        "typescript": false,
        "styles": "styles",
        "test": "test/**/*",
        "images": "images",
        "views": "views",
        "assets": "assets",
        "autoprefixerRules": ["last 2 versions", "> 1%"],
        "scripts": projectType === ProjectType.FRONTEND ? "scripts/*" : "lib/*",
        "manifest": null,
        "revisionExclude": [],
        "nodemon": {},
        "onPreBuild": [],
        "onPostBuild": [],
        "onRebundle": []
    };
};