"use strict";

const Task = require('../Task'),
    gulp = require('gulp');

class AssetsTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "assets";
    }

    action() {
        return gulp.src(this._buildManager.options.assets + '/**/*')
            .pipe(gulp.dest(this._buildManager.getTemporaryDirectory() + this._buildManager.options.assets + '/'));
    }
}

module.exports = AssetsTask;