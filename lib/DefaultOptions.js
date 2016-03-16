module.exports = function (module) {
    return {
        "module": false,
        "port": 5000,
        "liveReloadPort": 35729,
        "bundleFilename": "main",
        "distribution": "dist",
        "targets": "targets",
        "babel": {presets: []},
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