"use strict";

const Task = require('../Task'),
    del = require('del'),
    path = require('path'),
    ProjectType = require('../../ProjectType');

class CleanTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "clean";
        this.availableTo = [ProjectType.FRONTEND];
    }

    action() {
        var directoryToRemove = path.resolve(this._buildManager.getDistDirectory(),
            this._buildManager.isWatching() ? this._buildManager.currentTarget : "");
        return del([directoryToRemove, this._buildManager.getTemporaryDirectory()], {force: true});
    }
}

module.exports = CleanTask;