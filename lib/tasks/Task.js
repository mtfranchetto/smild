var Task = function (buildHelper) {
    this._buildHelper = buildHelper;
};

Task.prototype.command = "";
Task.prototype.availableToModule = true;
Task.prototype.dependsOn = [];
Task.prototype.action = function () {

};

module.exports = Task;