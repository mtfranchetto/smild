var inherits = require('util').inherits,
    Task = require('./Task'),
    del = require('del'),
    path = require('path');

var CleanTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(CleanTask, Task);

CleanTask.prototype.command = "clean";
CleanTask.prototype.action = function () {
    var directoryToRemove = path.resolve(this._buildHelper.getDistDirectory(),
        this._buildHelper.isWatching() ? this._buildHelper.currentTarget : "");
    return del([directoryToRemove, this._buildHelper.getTemporaryDirectory()], {force: true}, done);
};

module.exports = CleanTask;