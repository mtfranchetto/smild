"use strict";

const Promise = require('bluebird');

class Task {

    constructor(buildManager, taskRunner) {
        this._buildManager = buildManager;
        this._taskRunner = taskRunner;
        this.command = "";
        this.availableToModule = true;
        this.dependsOn = [];
    }

    action() {
        return Promise.resolve();
    }
}

module.exports = Task;