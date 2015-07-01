var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp');

var ImagesTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(ImagesTask, Task);

ImagesTask.prototype.command = "images";
ImagesTask.prototype.availableToModule = false;
ImagesTask.prototype.action = function () {
    return gulp.src(this._buildHelper.options.images + '/**/*')
        .pipe(gulp.dest(this._buildHelper.getTemporaryDirectory() + this._buildHelper.options.images + '/'));
};

module.exports = ImagesTask;