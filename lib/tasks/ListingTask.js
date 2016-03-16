"use strict";

const Task = require('./Task'),
    gulp = require('gulp'),
    _ = require('lodash'),
    TaskUtil = require('../util/TasksUtil');

class ListingTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "tasks";
    }

    action() {
        console.log();
        _.forEach(TaskUtil.getTaskList(), _.ary(console.log, 1));
        console.log();
    }
}

module.exports = ListingTask;