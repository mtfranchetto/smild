var inherits = require('util').inherits,
    Task = require('./Task'),
    Promise = require('bluebird'),
    express = require('express'),
    _ = require('lodash'),
    chalk = require('chalk');

var ServeTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(ServeTask, Task);

ServeTask.prototype.command = "serve";
ServeTask.prototype.availableToModule = false;
ServeTask.prototype.action = function () {
    var serverPort = this._buildHelper.options.port,
        server = express();

    server.use(express.static(this._buildHelper.getDistDirectory()));
    server.all('/*', _.bind(function (req, res) {
        res.sendfile('index.html', {root: this._buildHelper.getDistDirectory()});
    }, this));

    server.listen(serverPort);
    console.log(chalk.green('Target ' + this._buildHelper.currentTarget + ' listening on http://localhost:' + serverPort));
    return Promise.resolve();
};

module.exports = ServeTask;