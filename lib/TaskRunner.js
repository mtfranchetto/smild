var gulp = require('gulp'),
    Promise = require('bluebird');

var TaskRunner = function () {

};

// Fix stdout truncation on windows
function exit(code) {
    if (process.platform === 'win32' && process.stdout.bufferSize) {
        process.stdout.once('drain', function () {
            process.exit(code);
        });
        return;
    }
    process.exit(code);
}

TaskRunner.prototype.run = function (task) {
    return new Promise((resolve, reject) => {
        gulp.parallel(task)(function (error) {
            if (error) reject(error);
            else resolve();
        });
    }).catch(error => exit(1));
};

module.exports = TaskRunner;