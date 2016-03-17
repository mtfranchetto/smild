"use strict";

const Task = require('../Task'),
    gulp = require('gulp');

class ImagesTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "images";
        this.availableToModule = false;
    }

    action() {
        return gulp.src(this._buildHelper.options.images + '/**/*')
            .pipe(gulp.dest(this._buildHelper.getTemporaryDirectory() + this._buildHelper.options.images + '/'));
    }
}

module.exports = ImagesTask;