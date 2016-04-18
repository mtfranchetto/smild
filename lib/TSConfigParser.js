"use strict";

const path = require('path'),
    _ = require('lodash');

class TSConfigParser {

    static parse() {
        try {
            return require(path.join(process.cwd(), 'tsconfig.json'));
        } catch (error) {
            return require(path.join(__dirname, '../tsconfig.json'));
        }
    }
}

module.exports = TSConfigParser;