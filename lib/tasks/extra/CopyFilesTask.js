"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    merge = require('merge-stream'),
    _ = require('lodash');

class CopyFilesTask extends Task {

    constructor(buildManager) {
        super(buildManager);
    }

    action() {
        return merge(
            _.map(this.getFiles(), action => {
                return gulp.src(action.source).pipe(gulp.dest(this._buildHelper.getDistDirectory() + action.dest));
            }));
    }

    getFiles() {
        return [];
    }
}

module.exports = CopyFilesTask;