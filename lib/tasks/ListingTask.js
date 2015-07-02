var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    _ = require('lodash');

var ListingTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(ListingTask, Task);

ListingTask.prototype.command = "tasks";
ListingTask.prototype.action = function () {
    console.log();
    _.forEach(gulp.tree(), _.ary(console.log, 1));
    console.log();
};

module.exports = ListingTask;