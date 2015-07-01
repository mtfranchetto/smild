var inherits = require('util').inherits,
    Task = require('./Task'),
    livereload = require('connect-livereload'),
    refresh = require('gulp-livereload'),
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
        liveReloadPort = 35729,
        server = express();

    server.use(express.static(this._buildHelper.getDistDirectory()));
    server.use(livereload({port: liveReloadPort}));
    server.all('/*', _.bind(function (req, res) {
        res.sendfile('index.html', {root: this._buildHelper.getDistDirectory()});
    }, this));

    server.listen(serverPort);
    refresh.listen(liveReloadPort);
    console.log(chalk.green('Target ' + this._buildHelper.currentTarget + ' listening on http://localhost:' + serverPort));
};

module.exports = ServeTask;