"use strict";

const Task = require('./Task'),
    gulp = require('gulp'),
    path = require('path'),
    _ = require('lodash');

class WatchBuildTask extends Task {

    constructor(buildHelper, taskRunner) {
        super(buildHelper);
        this._taskRunner = taskRunner;
        this.command = "watch-build";
        this.availableToModule = false;
    }

    action() {
        var options = this._buildHelper.options,
            target = this._buildHelper.currentTarget;
        this._buildHelper.isWatching(true);
        this._taskRunner.run(gulp.series('build', 'serve'))
            .then(() => {
                gulp.watch([path.resolve(options.targets, target, 'bootstrapper.scss'),
                    path.resolve(options.targets, 'base.scss'),
                    path.resolve(process.cwd(), options.styles) + '/**/*.scss'], gulp.series('styles'));

                gulp.watch([options.views + '/**/*.html'], gulp.series('views'));
            });
    }
}

module.exports = WatchBuildTask;