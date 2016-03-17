"use strict";

const DefaultOptions = require('./DefaultOptions'),
    path = require('path'),
    _ = require('lodash');

class OptionsParser {

    parse() {
        var packageJson = null,
            smildFile = null;
        try {
            packageJson = require(path.join(process.cwd(), 'package.json'));
        } catch (error) {
            packageJson = {};
        }
        try {
            smildFile = require(path.join(process.cwd(), 'smildfile.js'));
        } catch (error) {
            smildFile = {};
        }
        return _.assign(DefaultOptions(smildFile.projectType), smildFile, {
            projectPackage: packageJson
        });
    }
}

module.exports = OptionsParser;