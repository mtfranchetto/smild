var inherits = require('util').inherits,
    Task = require('./Task');
const gulp = require('gulp');
const mocha = require('gulp-mocha');

var TestTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(TestTask, Task);

TestTask.prototype.command = "test";
TestTask.prototype.action = function () {
    return gulp.src(this._buildHelper.options.test, {read: false})
        .pipe(mocha({reporter: 'spec'}));
};

module.exports = TestTask;