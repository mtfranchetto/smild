"use strict";

const Promise = require('bluebird');

class Task {

    constructor(buildHelper) {
        this._buildHelper = buildHelper;
        this.command = "";
        this.availableToModule = true;
        this.dependsOn = [];
    }

    action() {
        return Promise.resolve();
    }
}

module.exports = Task;