var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    _ = require('lodash'),
    path = require('path');

var TargetsTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(TargetsTask, Task);

TargetsTask.prototype.command = "targets";
TargetsTask.prototype.availableToModule = false;
TargetsTask.prototype.action = function () {
    var targets = this._buildHelper.getDirectories(path.resolve(this._buildHelper.CWD, this._buildHelper.options.targets));
    console.log();
    _.forEach(targets, function (target) {
        console.log(target);
    });
    console.log();
};

module.exports = TargetsTask;