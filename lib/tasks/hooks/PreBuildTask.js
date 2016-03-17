"use strict";

const Task = require('../Task'),
    _ = require('lodash'),
    gulp = require('gulp'),
    Promise = require('bluebird');

class PreBuildTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "pre-build";
        this.availableToModule = false;
    }

    action() {
        if (!this._buildManager.options.onPreBuild.length) return Promise.resolve();
        return this._taskRunner.run(_.map(this._buildManager.options.onPreBuild, task => task.action));
    }
}

module.exports = PreBuildTask;