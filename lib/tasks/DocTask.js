var inherits = require('util').inherits,
    Task = require('./Task'),
    markdox = require('gulp-markdox'),
    gulp = require('gulp');

var DocTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(DocTask, Task);

DocTask.prototype.command = "doc";
DocTask.prototype.action = function () {
    return gulp.src(this._buildHelper.options.scripts + "**/*")
        .pipe(markdox())
        .pipe(concat("doc.md"))
        .pipe(gulp.dest("./doc"));
};

module.exports = DocTask;