var inherits = require('util').inherits,
    Task = require('./Task'),
    path = require('path'),
    karma = require('karma').server;

var TestTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(TestTask, Task);

TestTask.prototype.command = "test";
TestTask.prototype.action = function () {
    karma.start({
        configFile: path.resolve(__dirname + '../../', '/karma.conf.js'),
        singleRun: true
    });
};

module.exports = TestTask;