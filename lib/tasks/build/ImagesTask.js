"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    ProjectType = require('../../ProjectType');

class ImagesTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "images";
        this.availableTo = [ProjectType.FRONTEND];
    }

    action() {
        return gulp.src(this._buildManager.options.images + '/**/*')
            .pipe(gulp.dest(this._buildManager.getTemporaryDirectory() + this._buildManager.options.images + '/'));
    }
}

module.exports = ImagesTask;