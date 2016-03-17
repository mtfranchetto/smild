"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    _ = require('lodash');

class ListingTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "tasks";
    }

    action() {
        console.log();
        _.forEach(this._buildManager.getTasksList(), _.ary(console.log, 1));
        console.log();
    }
}

module.exports = ListingTask;