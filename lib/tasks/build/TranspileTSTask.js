"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    path = require('path'),
    ProjectType = require('../../ProjectType'),
    tsc = require('gulp-typescript');

class JSTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "js";
        this.availableTo = [ProjectType.FRONTEND_MODULE, ProjectType.NODEJS];
    }

    action() {
        var tsConfig = tsc.createProject("tsconfig.json");
        return gulp.src([
            this._buildManager.options.scripts + "/**/*.{ts,tsx}"
        ])
            .pipe(tsc(tsConfig))
            .on("error", function (error) {
                process.exit(1);
            })
            .pipe(gulp.dest(this._buildManager.options.distribution));
    }
}

module.exports = JSTask;