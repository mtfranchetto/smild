var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    plato = require('plato'),
    _ = require('lodash');

var AnalyzeTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(AnalyzeTask, Task);

AnalyzeTask.prototype.command = "analyze";
AnalyzeTask.prototype.action = function (done) {
    plato.inspect(this._buildHelper.options.scripts, this._buildHelper.options.analysisOutput, {
        recurse: true
    }, _.ary(done, 0));
};

module.exports = AnalyzeTask;