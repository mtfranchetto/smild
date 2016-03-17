"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    async = require('async'),
    path = require('path'),
    _ = require('lodash'),
    chalk = require('chalk'),
    Promise = require('bluebird');

class BuildTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "build";
        this.availableToModule = false;
        this.dependsOn = ['clean', 'pre-build'];
    }

    action() {
        var targets = [];
        if (this._buildManager.isWatching() || this._buildManager.currentTarget !== 'all') {
            targets = [this._buildManager.currentTarget];
        } else {
            targets = this._buildManager.getDirectories(path.resolve(this._buildManager.CWD, this._buildManager.options.targets));
        }
        return Promise.resolve(targets)
            .mapSeries(target => {
                this._buildManager.setTarget(target);
                console.log(chalk.cyan("Building target", target));
                return this._taskRunner.run(gulp.series(gulp.parallel(['views', 'styles', 'images', 'assets', 'js']), 'rev', 'manifest', 'post-build'))
                    .then(() => console.log(chalk.cyan("Finished target", target)));
            });
    }
}

module.exports = BuildTask;