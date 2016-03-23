"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    path = require('path'),
    nodemon = require('gulp-nodemon'),
    ProjectType = require('../../ProjectType');

class NodeWatchBuildTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "watch-build";
        this.availableTo = [ProjectType.NODEJS];
    }

    action() {
        return nodemon({
            script: 'bootstrapper.' + (this._buildManager.options.typescript ? "ts" : "js"),
            ext: 'js json ts',
            execMap: {
                "ts": path.resolve(__dirname, "../../../node_modules/ts-node/dist/bin/ts-node.js")
            }
        });
    }
}

module.exports = NodeWatchBuildTask;