"use strict";

const Task = require('./Task'),
    gulp = require('gulp'),
    plato = require('plato'),
    _ = require('lodash');

class AnalyzeTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "analyze";
    }

    action(done) {
        plato.inspect(this._buildHelper.options.scripts, "analysis/", {
            recurse: true
        }, _.ary(done, 0));
    }
}

module.exports = AnalyzeTask;