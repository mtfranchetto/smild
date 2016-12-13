"use strict";

const DefaultOptions = require('./DefaultOptions'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs');

class OptionsParser {

    static parse() {
        var smildFile = null,
            packageJson = {};
        try {
            packageJson = require(path.join(process.cwd(), 'package.json'));
        } catch (error) {
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

    static parseTypescript() {
        return this.parseProjectFile('tsconfig.json');
    }

    static parseProjectFile(filename) {
        try {
            return JSON.parse(fs.readFileSync(path.join(process.cwd(), filename), 'utf8'));
        } catch (error) {
            return JSON.parse(fs.readFileSync(path.join(__dirname, '../', filename), 'utf8'));
        }
    }
}

module.exports = OptionsParser;