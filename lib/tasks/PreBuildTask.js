var inherits = require('util').inherits,
    Task = require('./Task'),
    merge = require('merge-stream'),
    _ = require('lodash'),
    gulpif = require('gulp-if'),
    gulp = require('gulp'),
    rename = require('gulp-rename');

var PreBuildTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(PreBuildTask, Task);

PreBuildTask.prototype.command = "pre-build";
PreBuildTask.prototype.availableToModule = false;
PreBuildTask.prototype.action = function () {
    if (!this._buildHelper.options.preBuild.length) return;
    return merge(
        _.map(this._buildHelper.options.preBuild, function (action) {
            return gulp.src(action.source)
                .pipe(gulpif(!!action.ext, rename(function (path) {
                    path.extname = "." + action.ext;
                })))
                .pipe(gulp.dest(action.dest));
        })
    );
};

module.exports = PreBuildTask;