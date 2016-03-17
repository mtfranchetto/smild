"use strict";

const Task = require('../Task'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    ProjectType = require('../../ProjectType');

class PreBuildTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "pre-build";
        this.availableTo = [ProjectType.FRONTEND];
    }

    action() {
        if (!this._buildManager.options.onPreBuild.length) return Promise.resolve();
        return this._taskRunner.run(_.map(this._buildManager.options.onPreBuild, task => task.action));
    }
}

module.exports = PreBuildTask;