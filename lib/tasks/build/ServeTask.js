"use strict";

const Task = require('../Task'),
    Promise = require('bluebird'),
    express = require('express'),
    _ = require('lodash'),
    chalk = require('chalk');

class ServeTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "serve";
        this.availableToModule = false;
    }

    action() {
        var serverPort = this._buildManager.options.port,
            server = express();

        server.use(express.static(this._buildManager.getDistDirectory()));
        server.all('/*', _.bind(function (req, res) {
            res.sendFile('index.html', {root: this._buildManager.getDistDirectory()});
        }, this));

        server.listen(serverPort);
        console.log(chalk.cyan('Target ' + this._buildManager.currentTarget + ' listening on http://localhost:' + serverPort));
        return Promise.resolve();
    }
}

module.exports = ServeTask;