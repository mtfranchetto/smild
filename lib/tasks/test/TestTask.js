"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    isparta = require('isparta'),
    Promise = require('bluebird');

class TestTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "test";
        let extension = null;
        if (this._buildManager.options.typescript) {
            require('ts-node/register');
            extension = 'ts';
        } else {
            require('babel-core/register');
            extension = 'js';
        }
        this.dependsOn = [() => {
            if (this._buildManager.options.typescript) return Promise.resolve();
            return gulp.src([this._buildManager.options.scripts + '*/*.' + extension])
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