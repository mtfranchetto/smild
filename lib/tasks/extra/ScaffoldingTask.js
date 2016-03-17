"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    path = require('path'),
    replace = require('gulp-replace');

class ScaffoldingTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "create";
        this.availableToModule = false;
    }

    action() {
        var projectPath = path.resolve(__dirname, "../../../scaffolding", this._buildManager.module ? "module" : "app");
        return gulp.src(projectPath + '/**/*')
            .pipe(replace("$$NAME", this._buildManager.currentTarget))
            .pipe(replace("$$MODULE", this._buildManager.module))
            .pipe(gulp.dest("./"));
    }
}

module.exports = ScaffoldingTask;