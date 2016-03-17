"use strict";

const HookTask = require('./HookTask');

class RebundleTask extends HookTask {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "rebundle-hook";
    }

    action() {
        console.log('rebundleeeee');
        var Promise= require('bluebird');
        return Promise.resolve();
    }

    _getTasks() {
        return this._buildManager.options.onRebundle;
    }
}

module.exports = RebundleTask;