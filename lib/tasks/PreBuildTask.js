"use strict";

const Task = require('./Task'),
    merge = require('merge-stream'),
    _ = require('lodash'),
    gulpif = require('gulp-if'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    Promise = require('bluebird');

class PreBuildTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "pre-build";
        this.availableToModule = false;
    }

    action() {
        if (!this._buildHelper.options.preBuild.length) return Promise.resolve();
        return merge(
            _.map(this._buildHelper.options.preBuild, action => gulp.src(action.source)
                .pipe(gulpif(!!action.ext, rename(function (path) {
                    path.extname = "." + action.ext;
                })))
                .pipe(gulp.dest(action.dest)))
        );
    }
}

module.exports = PreBuildTask;