"use strict";

const Task = require('./Task'),
    gulp = require('gulp'),
    async = require('async'),
    path = require('path'),
    _ = require('lodash'),
    chalk = require('chalk'),
    Promise = require('bluebird');

class BuildTask extends Task {

    constructor(buildHelper, taskRunner) {
        super(buildHelper);
        this._taskRunner = taskRunner;
        this.command = "build";
        this.availableToModule = false;
        this.dependsOn = ['clean', 'pre-build'];
    }

    action() {
        var targets = [];
        if (this._buildHelper.isWatching() || this._buildHelper.currentTarget !== 'all') {
            targets = [this._buildHelper.currentTarget];
        } else {
            targets = this._buildHelper.getDirectories(path.resolve(this._buildHelper.CWD, this._buildHelper.options.targets));
        }
        return Promise.resolve(targets)
            .mapSeries(target => {
                this._buildHelper.setTarget(target);
                console.log(chalk.cyan("Building target", target));
                return this._taskRunner.run(gulp.series(gulp.parallel(['views', 'styles', 'images', 'assets', 'js']), 'rev', 'manifest', 'post-build'))
                    .then(() => console.log(chalk.cyan("Finished target", target)));
            });
    }
}

module.exports = BuildTask;