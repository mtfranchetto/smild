var inherits = require('util').inherits,
    Task = require('./Task'),
    path = require('path'),
    karma = require('karma').server;

var WatchTestTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(WatchTestTask, Task);

WatchTestTask.prototype.command = "watch-test";
WatchTestTask.prototype.action = function (done) {
    karma.start({
        configFile: path.resolve(__dirname + '../../', '/karma.conf.js'),
        singleRun: false
    }, done);
};

module.exports = WatchTestTask;