"use strict";

const HookTask = require('./HookTask');

class PreBuildTask extends HookTask {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "prebuild-hook";
    }

    _getTasks() {
        return this._buildManager.options.onPreBuild;
    }
}

module.exports = PreBuildTask;