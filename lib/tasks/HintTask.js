var inherits = require('util').inherits,
    Task = require('./Task'),
    jshint = require('gulp-jshint'),
    _ = require('lodash');

var HintTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(HintTask, Task);

HintTask.prototype.command = "hint";
HintTask.prototype.action = function () {
    return gulp.src(this._buildHelper.options.scripts + '**/*')
        .pipe(jshint(_.assign(this._buildHelper.options.jshint, {lookup: false})))
        .pipe(jshint.reporter('default'));
};

module.exports = HintTask;