"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');

class TestTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "test";
        this.dependsOn = [() => {
            return gulp.src([this._buildManager.options.scripts + '*/*.js'])
                .pipe(istanbul())
                .pipe(istanbul.hookRequire());
        }];
    }

    action() {
        return gulp.src(this._buildManager.options.test, {read: false})
            .pipe(mocha({reporter: 'spec'}))
            .pipe(istanbul.writeReports());
    }
}

module.exports = TestTask;