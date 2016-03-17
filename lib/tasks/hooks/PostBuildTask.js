"use strict";

const HookTask = require('./HookTask');

class PostBuildTask extends HookTask {

    constructor(buildManager, taskRunner) {
        super(buildManager, taskRunner);
        this.command = "postbuild-hook";
    }

    _getTasks() {
        return this._buildManager.options.onPostBuild;
    }
}

module.exports = PostBuildTask;