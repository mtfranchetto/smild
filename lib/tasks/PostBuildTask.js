"use strict";

const Task = require('./Task'),
    _ = require('lodash'),
    gulp = require('gulp'),
    Promise = require('bluebird');

class PostBuildTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "post-build";
        this.availableToModule = false;
    }

    action() {
        if (!this._buildHelper.options.onPostBuild.length) return Promise.resolve();
        return this._taskRunner.run(_.map(this._buildHelper.options.onPostBuild, task => task.action));
    }
}

module.exports = PostBuildTask;