var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    _ = require('lodash'),
    TaskUtil = require('../util/TasksUtil');

var ListingTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(ListingTask, Task);

ListingTask.prototype.command = "tasks";
ListingTask.prototype.action = function () {
    console.log();
    _.forEach(TaskUtil.getTaskList(), _.ary(console.log, 1));
    console.log();
};

module.exports = ListingTask;