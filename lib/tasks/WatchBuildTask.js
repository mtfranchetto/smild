var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    path = require('path'),
    _ = require('lodash');

var WatchBuildTask = function (buildHelper, taskRunner) {
    Task.call(this, buildHelper);
    this._taskRunner = taskRunner;
};

inherits(WatchBuildTask, Task);

WatchBuildTask.prototype.command = "watch-build";
WatchBuildTask.prototype.availableToModule = false;
WatchBuildTask.prototype.action = function () {
    var options = this._buildHelper.options,
        target = this._buildHelper.currentTarget;
    this._buildHelper.isWatching(true);
    this._taskRunner.run(gulp.series('build', 'serve', function () {
        gulp.watch([path.resolve(options.targets, target, 'bootstrapper.scss'),
            path.resolve(options.targets, 'base.scss'),
            path.resolve(process.cwd(), options.styles) + '/**/*.scss'], gulp.series('styles'));

        gulp.watch([options.views + '/**/*.html'], gulp.series('views'));
    }));
};

module.exports = WatchBuildTask;