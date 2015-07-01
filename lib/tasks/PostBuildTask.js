var inherits = require('util').inherits,
    Task = require('./Task'),
    merge = require('merge-stream'),
    _ = require('lodash'),
    gulpif = require('gulp-if'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    Promise = require('bluebird');

var PostBuildTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(PostBuildTask, Task);

PostBuildTask.prototype.command = "post-build";
PostBuildTask.prototype.availableToModule = false;
PostBuildTask.prototype.action = function () {
    if (!this._buildHelper.options.postBuild.length) return Promise.resolve();
    return merge(
        _.map(this._buildHelper.options.postBuild, _.bind(function (action) {
                return gulp.src(action.source)
                    .pipe(gulpif(!!action.ext, rename(function (path) {
                        path.extname = "." + action.ext;
                    })))
                    .pipe(gulp.dest(this._buildHelper.getDistDirectory() + action.dest));
            }, this)
        ));
};

module.exports = PostBuildTask;