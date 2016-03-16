"use strict";

const Task = require('./Task'),
    del = require('del'),
    path = require('path');

class CleanTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "clean";
    }

    action() {
        var directoryToRemove = path.resolve(this._buildHelper.getDistDirectory(),
            this._buildHelper.isWatching() ? this._buildHelper.currentTarget : "");
        return del([directoryToRemove, this._buildHelper.getTemporaryDirectory()], {force: true});
    }
}

module.exports = CleanTask;