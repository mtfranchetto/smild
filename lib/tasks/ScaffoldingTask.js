"use strict";

const Task = require('./Task'),
    gulp = require('gulp'),
    path = require('path'),
    replace = require('gulp-replace');

class ScaffoldingTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "create";
        this.availableToModule = false;
    }

    action() {
        var projectPath = path.resolve(__dirname, "../../scaffolding", this._buildHelper.module ? "module" : "app");
        return gulp.src(projectPath + '/**/*')
            .pipe(replace("$$NAME", this._buildHelper.currentTarget))
            .pipe(replace("$$MODULE", this._buildHelper.module))
            .pipe(gulp.dest("./"));
    }
}

module.exports = ScaffoldingTask;