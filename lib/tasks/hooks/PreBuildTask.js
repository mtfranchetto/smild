"use strict";

const Task = require('../Task'),
    _ = require('lodash'),
    gulp = require('gulp'),
    Promise = require('bluebird');

class PreBuildTask extends Task {

    constructor(buildHelper, taskRunner) {
        super(buildHelper);
        this._taskRunner = taskRunner;
        this.command = "pre-build";
        this.availableToModule = false;
    }

    action() {
        if (!this._buildHelper.options.onPreBuild.length) return Promise.resolve();
        return this._taskRunner.run(_.map(this._buildHelper.options.onPreBuild, task => task.action));
    }
}

module.exports = PreBuildTask;