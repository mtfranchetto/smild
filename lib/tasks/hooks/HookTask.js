"use strict";

const Task = require('../Task'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    ProjectType = require('../../ProjectType');

class HookTask extends Task {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.availableTo = [ProjectType.FRONTEND];
    }

    action() {
        if (!this._getTasks().length) return Promise.resolve();
        return this._taskRunner.run(_.map(this._getTasks(), task => {
            task._buildManager = this._buildManager;
            task._taskRunner = this._taskRunner;
            return task.action;
        }));
    }

    _getTasks() {
        return [];
    }
}

module.exports = HookTask;