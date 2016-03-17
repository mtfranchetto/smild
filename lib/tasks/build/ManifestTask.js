"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    manifest = require('gulp-manifest'),
    Promise = require('bluebird');

class ManifestTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "manifest";
        this.availableToModule = false;
    }

    action() {
        if (!this._buildHelper.isRelease() || !this._buildHelper.options.manifest) return Promise.resolve();
        return gulp.src(this._buildHelper.getDistDirectory() + '**/*')
            .pipe(manifest(this._buildHelper.options.manifest))
            .pipe(gulp.dest(this._buildHelper.getDistDirectory()));
    }
}

module.exports = ManifestTask;