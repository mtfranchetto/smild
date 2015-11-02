var inherits = require('util').inherits,
    Task = require('./Task'),
    path = require('path'),
    gulp = require('gulp'),
    webdriver = require('gulp-webdriver');

var E2ETestTask = function (buildHelper) {
    Task.call(this, buildHelper);
};

inherits(E2ETestTask, Task);

E2ETestTask.prototype.command = "e2e-test";
E2ETestTask.prototype.action = function () {
    //Try to load project config file if available
    var configFile = "";
    try {
        require(path.resolve(process.cwd(), 'wdio.conf.js'));
        configFile = path.resolve(process.cwd(), 'wdio.conf.js');
    } catch (error) {
        configFile = path.resolve(__dirname, '../..', 'wdio.conf.js');
    }
    return gulp.src(configFile).pipe(webdriver());
};

module.exports = E2ETestTask;