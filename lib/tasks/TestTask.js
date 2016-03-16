const inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');

var TestTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(TestTask, Task);

TestTask.prototype.command = "test";
TestTask.prototype.dependsOn = [function () {
    return gulp.src([this._buildHelper.options.scripts + '*/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
}];
TestTask.prototype.action = function () {
    return gulp.src(this._buildHelper.options.test, {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .pipe(istanbul.writeReports());
};

module.exports = TestTask;