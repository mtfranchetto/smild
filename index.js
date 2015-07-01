var gulp = require('gulp'),
    OptionsParser = require('./lib/OptionsParser'),
    BuildHelper = require('./lib/BuildHelper'),
    TaskRunner = require('./lib/TaskRunner'),
    availableTasks = require('./lib/tasks'),
    _ = require('lodash'),
    chalk = require('chalk'),
    prettyTime = require('pretty-hrtime');

var optionsParser = new OptionsParser(),
    buildHelper = new BuildHelper(optionsParser),
    options = optionsParser.parse(),
    taskRunner = new TaskRunner();

_.forEach(availableTasks, function (TaskConstructor) {
    var task = new TaskConstructor(buildHelper, taskRunner);
    if (options.module && !task.availableToModule)
        return;
    gulp.task(task.command, gulp.series.apply(gulp, _.union(task.dependsOn, [_.bind(task.action, task)])));
});

var registeredTasks = gulp.tree();

gulp.on('start', function (event) {
    if (_.indexOf(registeredTasks, event.name) < 0) return;
    console.log('Starting', '\'' + chalk.yellow(event.name) + '\'...');
});

gulp.on('stop', function (event) {
    if (_.indexOf(registeredTasks, event.name) < 0) return;
    var time = prettyTime(event.duration);
    console.log(
        'Finished', '\'' + chalk.yellow(event.name) + '\'',
        'after', chalk.blue(time)
    );
});

gulp.on('error', function (event) {
    if (_.indexOf(registeredTasks, event.name) < 0) return;
    var msg = formatError(event);
    var time = prettyTime(event.duration);
    console.log(
        '\'' + chalk.yellow(event.name) + '\'',
        chalk.red('errored after'),
        chalk.blue(time)
    );
    console.error(msg);
});

function formatError(e) {
    if (!e.error) {
        return e.message;
    }
    // PluginError
    if (typeof e.error.showStack === 'boolean') {
        return e.error.toString();
    }
    // Normal error
    if (e.error.stack) {
        return e.error.stack;
    }
    // Unknown (string, number, etc.)
    return new Error(String(e.error)).stack;
}

module.exports = {
    taskRunner: taskRunner,
    buildHelper: buildHelper
};