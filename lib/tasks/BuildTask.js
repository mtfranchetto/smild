var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    async = require('async'),
    path = require('path'),
    _ = require('lodash');

var BuildTask = function (buildHelper, taskRunner) {
    Task.call(this, buildHelper);
    this._taskRunner = taskRunner;
};

inherits(BuildTask, Task);

BuildTask.prototype.command = "build";
BuildTask.prototype.availableToModule = false;
BuildTask.prototype.dependsOn = ['clean', 'pre-build'];
BuildTask.prototype.action = function (done) {
    var targets = [];
    if (this._buildHelper.isWatching() || this._buildHelper.currentTarget !== 'all') {
        targets = [this._buildHelper.currentTarget];
    } else {
        targets = this._buildHelper.getDirectories(path.resolve(this._buildHelper.CWD, this._buildHelper.options.targets));
    }
    async.mapSeries(targets, _.bind(function (target, callback) {
        this._buildHelper.setTarget(target);
        this._taskRunner.run(gulp.series(gulp.parallel(['views', 'styles', 'images', 'assets', 'browserify']), 'rev', 'manifest', 'post-build', callback));
    }, this), _.ary(done, 0));
};

module.exports = BuildTask;