"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha');

class TestTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "test";
    }

    action() {
        return gulp.src(this._buildManager.options.test, {read: false})
            .pipe(mocha({
                reporter: 'spec',
                compilers: {
                    ts: require('ts-node/register')
                }
            }));
    }
}

module.exports = TestTask;