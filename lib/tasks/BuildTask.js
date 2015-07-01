var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    async = require('async'),
    path = require('path');

var BuildTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(BuildTask, Task);

BuildTask.prototype.command = "build";
BuildTask.prototype.availableToModule = false;
BuildTask.prototype.dependsOn = ['clean', 'pre-build'];
BuildTask.prototype.action = function () {
    var targets = [];
    if (this._buildHelper.isWatching() || this._buildHelper.currentTarget !== 'all') {
        targets = [this._buildHelper.currentTarget];
    } else {
        targets = this._buildHelper.getDirectories(path.resolve(this._buildHelper.CWD, this._buildHelper.options.targets));
    }
    async.mapSeries(targets, function (target, callback) {
        this._buildHelper.currentTarget = target;
        gulp.series(gulp.parallel(['views', 'styles', 'images', 'assets', 'browserify']), 'rev', 'manifest', 'post-build', callback);
    });
};

module.exports = BuildTask;