var gulp = require('gulp'),
    OptionsParser = require('./lib/OptionsParser'),
    BuildHelper = require('./lib/BuildHelper'),
    availableTasks = require('./lib/tasks'),
    _ = require('lodash');

var optionsParser = new OptionsParser(),
    buildHelper = new BuildHelper(optionsParser),
    options = optionsParser.parse();

_.forEach(availableTasks, function (TaskConstructor) {
    var task = new TaskConstructor();
    if (options.module && !task.availableToModule)
        return;
    gulp.task(task.command, gulp.series.apply(_.union(tasks.dependsOn, _.bind(task.action, task))));
});

module.exports = {
    runTask: function (task) {
        gulp.series(task);
    },
    buildHelper: buildHelper
};