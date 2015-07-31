var DefaultOptions = require('./DefaultOptions'),
    path = require('path'),
    _ = require('lodash');

var OptionsParser = function () {

};

OptionsParser.prototype.parse = _.memoize(function () {
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
        smildFile = null;
    }
    var options = smildFile ? smildFile : packageJson.smild;
    return _.assign(DefaultOptions(options && options.module), options, {
        projectPackage: packageJson
    });
});

module.exports = OptionsParser;