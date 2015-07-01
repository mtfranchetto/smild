var gulp = require('gulp');

var TaskRunner = function () {

};

TaskRunner.prototype.run = function (task) {
    gulp.parallel(task)(function (error) {
        //Suppress errors in order to keep watching if a file is malformed
        console.error(error);
    });
};

module.exports = TaskRunner;