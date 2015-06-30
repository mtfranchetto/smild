var DefaultOptions = require('./DefaultOptions'),
    path = require('path'),
    _ = require('lodash');

var OptionsParser = function () {

};

OptionsParser.prototype.parse = function () {
    var packageJson = require(path.join(process.cwd(), 'package.json')),
        smildOptions = packageJson.smild;
    return _.assign(DefaultOptions(smildOptions && smildOptions.module), smildOptions, {
        projectPackage: packageJson
    });
};

module.exports = OptionsParser;