"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    manifest = require('gulp-manifest'),
    Promise = require('bluebird');

class ManifestTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "manifest";
        this.availableToModule = false;
    }

    action() {
        if (!this._buildManager.isRelease() || !this._buildManager.options.manifest) return Promise.resolve();
        return gulp.src(this._buildManager.getDistDirectory() + '**/*')
            .pipe(manifest(this._buildManager.options.manifest))
            .pipe(gulp.dest(this._buildManager.getDistDirectory()));
    }
}

module.exports = ManifestTask;