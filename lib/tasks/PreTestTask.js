const inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    istanbul = require('gulp-istanbul');

var PreTestTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(PreTestTask, Task);

PreTestTask.prototype.command = "pre-test";
PreTestTask.prototype.action = function () {
    return gulp.src([this._buildHelper.options.scripts + '*/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
};

module.exports = PreTestTask;