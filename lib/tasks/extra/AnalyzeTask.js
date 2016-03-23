"use strict";

const Task = require('../Task'),
    plato = require('plato'),
    _ = require('lodash');

class AnalyzeTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "analyze";
    }

    action(done) {
        plato.inspect(this._buildManager.options.scripts, "analysis/", {
            recurse: true
        }, _.ary(done, 0));
    }
}

module.exports = AnalyzeTask;