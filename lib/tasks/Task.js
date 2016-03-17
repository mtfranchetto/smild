"use strict";

const Promise = require('bluebird'),
    ProjectType = require('../ProjectType');

class Task {

    constructor(buildManager, taskRunner) {
        this._buildManager = buildManager;
        this._taskRunner = taskRunner;
        this.command = "";
        this.availableTo = [ProjectType.FRONTEND, ProjectType.FRONTEND_MODULE];
        this.dependsOn = [];
    }

    action() {
        return Promise.resolve();
    }
}

module.exports = Task;