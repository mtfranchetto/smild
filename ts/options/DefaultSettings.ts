import ProjectType from "../ProjectType";
const path = require('path');

export default (projectType) => {
    projectType = projectType || ProjectType.FRONTEND;
    return {
        "projectType": projectType,
        "port": 5000,
        "liveReloadPort": 35729,
        "bundleFilename": "main",
        "distribution": "dist",
        "targets": "targets",
        "styles": "styles",
        "test": "test/**/*.ts",
        "images": "images",
        "views": "views",
        "assets": "assets",
        "autoprefixerRules": ["last 2 versions", "> 1%"],
        "scripts": projectType === ProjectType.FRONTEND ? "scripts/*" : "lib/*",
        "manifest": null,
        "revisionExclude": [],
        "nodemon": {},
        "uglifyjs": {},
        "onPreBuild": [],
        "onPostBuild": []
    };
};