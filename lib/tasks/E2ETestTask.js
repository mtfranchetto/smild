"use strict";

const Task = require('./Task'),
    path = require('path'),
    gulp = require('gulp'),
    webdriver = require('gulp-webdriver');

class E2ETestTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "e2e-test";
    }

    action() {
        //Try to load project config file if available
        var configFile = "";
        try {
            require(path.resolve(process.cwd(), 'wdio.conf.js'));
            configFile = path.resolve(process.cwd(), 'wdio.conf.js');
        } catch (error) {
            configFile = path.resolve(__dirname, '../..', 'wdio.conf.js');
        }
        return gulp.src(configFile).pipe(webdriver());
    }
}

module.exports = E2ETestTask;