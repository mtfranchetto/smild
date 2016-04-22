"use strict";

const Task = require('../Task'),
    RevAll = require('gulp-rev-all'),
    _ = require('lodash'),
    gulp = require('gulp'),
    Promise = require('bluebird'),
    ProjectType = require('../../ProjectType');

class RevTask extends Task {
    constructor(buildManager) {
        super(buildManager);
        this.command = "rev";
        this.availableTo = [ProjectType.FRONTEND];
    }

    action() {
        if (!this._buildManager.isRelease()) return Promise.resolve();
        if (this._buildManager.options.revisionExclude === "*") {
            return gulp.src(this._buildManager.getTemporaryDirectory() + '**')
                .pipe(gulp.dest(this._buildManager.getDistDirectory()));
        }
        var excludedFiles = _.union(
            ['favicon.ico', 'index.html'],
            _.map(this._buildManager.options.revisionExclude, rule => rule.regexp ? new RegExp(rule.pattern) : rule.pattern));
        var revTransform = new RevAll({
            dontRenameFile: excludedFiles,
            dontUpdateReference: excludedFiles
        });
        return gulp.src(this._buildManager.getTemporaryDirectory() + '**')
            .pipe(revTransform.revision())
            .pipe(gulp.dest(this._buildManager.getDistDirectory()));
    }
}

module.exports = RevTask;