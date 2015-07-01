var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp');

var AssetsTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(AssetsTask, Task);

AssetsTask.prototype.command = "assets";
AssetsTask.prototype.availableToModule = false;
AssetsTask.prototype.action = function () {
    return gulp.src(this._buildHelper.options.assets + '/**/*')
        .pipe(gulp.dest(this._buildHelper.getTemporaryDirectory() + this._buildHelper.options.assets + '/'));
};

module.exports = AssetsTask;