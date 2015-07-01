var inherits = require('util').inherits,
    Task = require('./Task'),
    gulp = require('gulp'),
    plato = require('plato'),
    _ = require('lodash');

var ComplexityTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(ComplexityTask, Task);

ComplexityTask.prototype.command = "complexity";
ComplexityTask.prototype.action = function (done) {
    plato.inspect(this._buildHelper.options.scripts, this._buildHelper.options.analysisOutput, {
        recurse: true
    }, _.ary(done, 0));
};

module.exports = ComplexityTask;