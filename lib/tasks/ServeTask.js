"use strict";

const Task = require('./Task'),
    Promise = require('bluebird'),
    express = require('express'),
    _ = require('lodash'),
    chalk = require('chalk');

class ServeTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "serve";
        this.availableToModule = false;
    }

    action() {
        var serverPort = this._buildHelper.options.port,
            server = express();

        server.use(express.static(this._buildHelper.getDistDirectory()));
        server.all('/*', _.bind(function (req, res) {
            res.sendFile('index.html', {root: this._buildHelper.getDistDirectory()});
        }, this));

        server.listen(serverPort);
        console.log(chalk.cyan('Target ' + this._buildHelper.currentTarget + ' listening on http://localhost:' + serverPort));
        return Promise.resolve();
    }
}

module.exports = ServeTask;