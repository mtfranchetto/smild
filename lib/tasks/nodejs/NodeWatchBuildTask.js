"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    path = require('path'),
    nodemon = require('gulp-nodemon'),
    ProjectType = require('../../ProjectType'),
    _ = require('lodash');

class NodeWatchBuildTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "watch-build";
        this.availableTo = [ProjectType.NODEJS];
    }

    action() {
        return nodemon(_, merge({
            script: 'bootstrapper.' + (this._buildManager.options.typescript ? "ts" : "js"),
            ext: 'js json ts',
            execMap: {
                "ts": path.resolve(__dirname, "../../../node_modules/ts-node/dist/bin/ts-node.js")
            }
        }, this._buildManager.options.nodemon));
    }
}

module.exports = NodeWatchBuildTask;