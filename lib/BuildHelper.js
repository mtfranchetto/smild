var fs = require('fs'),
    _ = require('lodash'),
    path = require('path');

var BuildHelper = function (optionsParser) {
    this.options = optionsParser.parse();
    this.DIST_FOLDER = this.options.distribution;
    this.BUNDLE_FILENAME = this.options.bundleFilename;
    this.TEMPORARY_FOLDER = "tmp";
    this.CWD = process.cwd();
    this.currentTarget = null;
    this._release = false;
    this._watching = false;
    this.module = false;
};

BuildHelper.prototype.setTarget = function (target) {
    this.currentTarget = target;
    process.env.TARGET = target;
    process.env.DEBUG = !this.isRelease();
    process.env.CWD = this.CWD;
};

BuildHelper.prototype.setModule = function (module) {
    this.module = module;
};

BuildHelper.prototype.getDirectories = function (rootDir) {
    var files = fs.readdirSync(rootDir),
        directories = [];
    _.forEach(files, function (file) {
        if (file[0] != '.') {
            var filePath = rootDir + '/' + file,
                stat = fs.statSync(filePath);
            if (stat.isDirectory())
                directories.push(file);
        }
    });
    return directories;
};

BuildHelper.prototype.isRelease = function (release) {
    if (typeof release === 'undefined')
        return this._release;
    else
        this._release = release;
};

BuildHelper.prototype.isWatching = function (watching) {
    if (typeof watching === 'undefined')
        return this._watching;
    else
        this._watching = watching;
};

BuildHelper.prototype.getDistDirectory = function () {
    return this._addTargetToDirectory(this.DIST_FOLDER);
};

BuildHelper.prototype.getTemporaryDirectory = function () {
    //When running debug use always the dist folder (because revisioning is disabled)
    return this._addTargetToDirectory(this.isRelease() ? this.TEMPORARY_FOLDER : this.DIST_FOLDER);
};

BuildHelper.prototype._addTargetToDirectory = function (directory) {
    return path.resolve(directory, this.currentTarget) + '/';
};

module.exports = BuildHelper;