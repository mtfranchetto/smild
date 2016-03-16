"use strict";

const Task = require('./Task'),
    gulp = require('gulp');

class AssetsTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "assets";
    }

    action() {
        return gulp.src(this._buildHelper.options.assets + '/**/*')
            .pipe(gulp.dest(this._buildHelper.getTemporaryDirectory() + this._buildHelper.options.assets + '/'));
    }
}

module.exports = AssetsTask;