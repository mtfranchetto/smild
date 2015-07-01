var gulp = require('gulp');

var TaskRunner = function () {

};

TaskRunner.prototype.run = function (task) {
    gulp.parallel(task)(function (error) {
        if (error) {
            exit(1);
        }
    });
};

module.exports = TaskRunner;