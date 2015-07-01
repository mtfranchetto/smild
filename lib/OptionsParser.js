var DefaultOptions = require('./DefaultOptions'),
    path = require('path'),
    _ = require('lodash');

var OptionsParser = function () {

};

OptionsParser.prototype.parse = _.memoize(function () {
    var packageJson = {};
    try {
        packageJson = require(path.join(process.cwd(), 'package.json'));
    } catch (error) {

    }
    var smildOptions = packageJson.smild;
    return _.assign(DefaultOptions(smildOptions && smildOptions.module), smildOptions, {
        projectPackage: packageJson
    });
});

module.exports = OptionsParser;