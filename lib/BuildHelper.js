"use strict";

const fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    gulp = require('gulp');

class BuildHelper {

    constructor(optionsParser) {
        this.options = optionsParser.parse();
        this.DIST_FOLDER = this.options.distribution;
        this.BUNDLE_FILENAME = this.options.bundleFilename;
        this.TEMPORARY_FOLDER = "tmp";
        this.CWD = process.cwd();
        this.currentTarget = null;
        this._release = false;
        this._watching = false;
        this.module = false;
    }


    setTarget(target) {
        this.currentTarget = target;
        process.env.TARGET = target;
        process.env.DEBUG = !this.isRelease();
        process.env.CWD = this.CWD;
    }

    setModule(module) {
        this.module = module;
    }

    getDirectories(rootDir) {
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
    }

    getTasksList() {
        return gulp.tree().nodes;
    }

    isRelease(release) {
        if (typeof release === 'undefined')
            return this._release;
        else
            this._release = release;
    }

    isWatching(watching) {
        if (typeof watching === 'undefined')
            return this._watching;
        else
            this._watching = watching;
    }

    getDistDirectory() {
        return this._addTargetToDirectory(this.DIST_FOLDER);
    }

    getTemporaryDirectory() {
        //When running debug use always the dist folder (because revisioning is disabled)
        return this._addTargetToDirectory(this.isRelease() ? this.TEMPORARY_FOLDER : this.DIST_FOLDER);
    }

    _addTargetToDirectory(directory) {
        return path.resolve(directory, this.currentTarget) + '/';
    }
}

module.exports = BuildHelper;