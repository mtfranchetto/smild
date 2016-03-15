var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    concat = require('gulp-concat'),
    fs = require('fs');

var DocTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(DocTask, Task);

DocTask.prototype.command = "doc";
DocTask.prototype.action = function () {
    //Dirty trick to capture Mocha output into a file
    //since gulp-mocha does not pipe the test output
    fs.writeFileSync('./doc.html', '');
    var originalWrite = process.stdout.write;
    process.stdout.write = function (chunk) {
        var textChunk = chunk.toString('utf8');
        if (!textChunk.match(/finished.+after/gmi)) {
            fs.appendFile('./doc.html', chunk);
        }
        originalWrite.apply(this, arguments);
    };

    return gulp.src(this._buildHelper.options.test, {read: false})
        .pipe(mocha({reporter: 'doc'}));
};

module.exports = DocTask;