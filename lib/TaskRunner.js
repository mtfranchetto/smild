var gulp = require('gulp');

var TaskRunner = function () {

};

TaskRunner.prototype.run = function (task) {
    gulp.parallel(task)(function (error) {
        if (error) {
            process.exit(1);
        }
    });
};

module.exports = TaskRunner;