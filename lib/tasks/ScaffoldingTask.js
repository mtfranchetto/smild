var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    path = require('path'),
    replace = require('gulp-replace');

var ScaffoldingTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(ScaffoldingTask, Task);

ScaffoldingTask.prototype.command = "create";
ScaffoldingTask.prototype.availableToModule = false;
ScaffoldingTask.prototype.action = function () {
    var projectPath = path.resolve(__dirname, "../../scaffolding", this._buildHelper.module ? "module" : "app");
    return gulp.src(projectPath + '/**/*')
        .pipe(replace("$$NAME", this._buildHelper.currentTarget))
        .pipe(replace("$$MODULE", this._buildHelper.module))
        .pipe(gulp.dest("./"));
};

module.exports = ScaffoldingTask;