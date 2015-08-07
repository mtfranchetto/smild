var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    manifest = require('gulp-manifest'),
    Promise = require('bluebird');

var ManifestTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(ManifestTask, Task);

ManifestTask.prototype.command = "manifest";
ManifestTask.prototype.availableToModule = false;
ManifestTask.prototype.action = function () {
    if (!this._buildHelper.isRelease() || !this._buildHelper.options.manifest) return Promise.resolve();
    return gulp.src(this._buildHelper.getDistDirectory() + '**/*')
        .pipe(manifest(this._buildHelper.options.manifest))
        .pipe(gulp.dest(this._buildHelper.getDistDirectory()));
};

module.exports = ManifestTask;