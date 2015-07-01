var gulp = require('gulp'),
    OptionsParser = require('./lib/OptionsParser'),
    BuildHelper = require('./lib/BuildHelper'),
    availableTasks = require('./lib/tasks'),
    _ = require('lodash'),
    chalk = require('chalk'),
    prettyTime = require('pretty-hrtime');

var optionsParser = new OptionsParser(),
    buildHelper = new BuildHelper(optionsParser),
    options = optionsParser.parse();

_.forEach(availableTasks, function (TaskConstructor) {
    var task = new TaskConstructor(buildHelper);
    if (options.module && !task.availableToModule)
        return;
    gulp.task(task.command, gulp.series.apply(gulp, _.union(task.dependsOn, [_.bind(task.action, task)])));
});

gulp.on('start', function (event) {
    if (event.name === 'wrapper') return;
    console.log('Starting', '\'' + chalk.yellow(event.name) + '\'...');
});

gulp.on('stop', function (event) {
    if (event.name === 'wrapper') return;
    var time = prettyTime(event.duration);
    console.log(
        'Finished', '\'' + chalk.yellow(event.name) + '\'',
        'after', chalk.blue(time)
    );
});

gulp.on('error', function (event) {
    if (event.name === 'wrapper') return;
    var msg = formatError(event);
    var time = prettyTime(event.duration);
    console.log(
        '\'' + chalk.yellow(event.name) + '\'',
        chalk.red('errored after'),
        chalk.blue(time)
    );
    console.log(msg);
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