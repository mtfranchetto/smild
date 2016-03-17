"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    path = require('path'),
    ProjectType = require('../../ProjectType');

class WatchBuildTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "watch-build";
        this.availableTo = [ProjectType.FRONTEND];
    }

    action() {
        var options = this._buildManager.options,
            target = this._buildManager.currentTarget;
        this._buildManager.isWatching(true);
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