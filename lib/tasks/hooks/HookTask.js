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
        return this._taskRunner.run(
            _(this._getTasks())
                .map(CustomTask => new CustomTask(this._buildManager, this._taskRunner))
                .map(task => _.bind(task.action, task))
        );
    }

    _getTasks() {
        return [];
    }
}

module.exports = HookTask;