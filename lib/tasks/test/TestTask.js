"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    isparta = require('isparta');

class TestTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "test";
        this.dependsOn = [() => {
            return gulp.src([this._buildManager.options.scripts +
                '*/*.' + (this._buildManager.options.typescript ? 'ts' : 'js')])
                .pipe(istanbul({
                    instrumenter: isparta.Instrumenter,
                    includeUntested: true
                }))
                .pipe(istanbul.hookRequire());
        }];
    }

    action() {
        return gulp.src(this._buildManager.options.test, {read: false})
            .pipe(mocha({
                reporter: 'spec',
                compilers: {
                    ts: require('ts-node/register'),
                    js: require('babel-core/register')
                }
            }))
            .pipe(istanbul.writeReports({
                reporters: ['lcov', 'json', 'text', 'text-summary', 'cobertura']
            }))
    }
}

module.exports = TestTask;