"use strict";

const gulp = require('gulp'),
    Promise = require('bluebird');

class TaskRunner {

    run(task) {
        return new Promise((resolve, reject) => {
            gulp.parallel(task)(function (error) {
                if (error) reject(error);
                else resolve();
            });
        }).catch(error => this._exit(1));
    }

    _exit(code) {
        // Fix stdout truncation on windows
        if (process.platform === 'win32' && process.stdout.bufferSize) {
            process.stdout.once('drain', function () {
                process.exit(code);
            });
            return;
        }
        process.exit(code);
    }
}

module.exports = TaskRunner;