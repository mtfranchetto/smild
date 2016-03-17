"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    _ = require('lodash'),
    path = require('path'),
    Promise = require('bluebird'),
    ProjectType = require('../../ProjectType');

class TargetsTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "targets";
        this.availableTo = [ProjectType.FRONTEND];
    }

    action() {
        var targets = this._buildManager.getDirectories(path.resolve(this._buildManager.CWD, this._buildManager.options.targets));
        console.log();
        _.forEach(targets, _.ary(console.log, 1));
        console.log();
        return Promise.resolve();
    }
}

module.exports = TargetsTask;