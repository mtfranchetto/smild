const gulp = require('gulp'),
    OptionsParser = require('./lib/OptionsParser'),
    BuildManager = require('./lib/BuildManager'),
    TaskRunner = require('./lib/TaskRunner'),
    Formatter = require('./lib/Formatter'),
    availableTasks = require('./lib/tasks'),
    _ = require('lodash'),
    chalk = require('chalk'),
    prettyTime = require('pretty-hrtime');

const optionsParser = new OptionsParser(),
    buildManager = new BuildManager(optionsParser),
    options = optionsParser.parse(),
    taskRunner = new TaskRunner();

_.forEach(availableTasks, TaskConstructor => {
    var task = new TaskConstructor(buildManager, taskRunner);
    if (_.indexOf(task.availableTo, options.projectType) > -1)
        gulp.task(task.command, gulp.series.apply(gulp, _.union(task.dependsOn, [_.bind(task.action, task)])));
});

const registeredTasks = buildManager.getTasksList();

gulp.on('start', event => {
    if (_.indexOf(registeredTasks, event.name) < 0) return;
    console.log('Starting', '\'' + chalk.yellow(event.name) + '\'...');
});

gulp.on('stop', event => {
    if (_.indexOf(registeredTasks, event.name) < 0) return;
    var time = prettyTime(event.duration);
    console.log(
        'Finished', '\'' + chalk.yellow(event.name) + '\'',
        'after', chalk.blue(time)
    );
});

gulp.on('error', event => {
    if (_.indexOf(registeredTasks, event.name) < 0) return;
    var msg = Formatter.formatError(event);
    var time = prettyTime(event.duration);
    console.log(
        '\'' + chalk.yellow(event.name) + '\'',
        chalk.red('errored after'),
        chalk.blue(time)
    );
    console.error(msg);
});

module.exports = {
    taskRunner: taskRunner,
    buildManager: buildManager,
    Task: require('./lib/tasks/Task')
};