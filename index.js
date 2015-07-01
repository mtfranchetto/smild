var gulp = require('gulp'),
    OptionsParser = require('./lib/OptionsParser'),
    BuildHelper = require('./lib/BuildHelper'),
    availableTasks = require('./lib/tasks'),
    _ = require('lodash');

var optionsParser = new OptionsParser(),
    buildHelper = new BuildHelper(optionsParser),
    options = optionsParser.parse();

_.forEach(availableTasks, function (TaskConstructor) {
    var task = new TaskConstructor(buildHelper);
    if (options.module && !task.availableToModule)
        return;
    gulp.task(task.command, gulp.series.apply(gulp, _.union(task.dependsOn, [_.bind(task.action, task)])));
});

module.exports = {
    runTask: function (task) {
        gulp.parallel(task)(function (error) {
            if (error) {
                console.error(error);
                exit(1);
            }
        });
    },
    buildHelper: buildHelper
};