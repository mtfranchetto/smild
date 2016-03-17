"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    _ = require('lodash'),
    path = require('path'),
    Promise = require('bluebird');

class TargetsTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "targets";
        this.availableToModule = false;
    }

    action() {
        var targets = this._buildHelper.getDirectories(path.resolve(this._buildHelper.CWD, this._buildHelper.options.targets));
        console.log();
        _.forEach(targets, _.ary(console.log, 1));
        console.log();
        return Promise.resolve();
    }
}

module.exports = TargetsTask;