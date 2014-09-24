"use strict";

module.exports = function (gulp) {
    var build = require('./build'),
        options = require('./config').options();

    build(gulp, options);
};