var gulp = require('gulp');

var TaskRunner = function () {

};

// Fix stdout truncation on windows
function exit(code) {
    if (process.platform === 'win32' && process.stdout.bufferSize) {
        process.stdout.once('drain', function() {
            process.exit(code);
        });
        return;
    }
    process.exit(code);
}

TaskRunner.prototype.run = function (task) {
    gulp.parallel(task)(function (error) {
        if (error) {
            exit(1);
        }
    });
};

module.exports = TaskRunner;