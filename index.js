const gulp = require('gulp'),
    OptionsParser = require('./lib/OptionsParser'),
    BuildHelper = require('./lib/BuildHelper'),
    TaskRunner = require('./lib/TaskRunner'),
    Formatter = require('./lib/util/Formatter'),
    availableTasks = require('./lib/tasks'),
    TaskUtil = require('./lib/util/TasksUtil'),
    _ = require('lodash'),
    chalk = require('chalk'),
    prettyTime = require('pretty-hrtime');

const optionsParser = new OptionsParser(),
    buildHelper = new BuildHelper(optionsParser),
    options = optionsParser.parse(),
    taskRunner = new TaskRunner();

_.forEach(availableTasks, TaskConstructor => {
    var task = new TaskConstructor(buildHelper, taskRunner);
    if (options.module && !task.availableToModule)
        return;
    gulp.task(task.command, gulp.series.apply(gulp, _.union(task.dependsOn, [_.bind(task.action, task)])));
});

const registeredTasks = TaskUtil.getTaskList();

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
    buildHelper: buildHelper,
    Task: require('./lib/tasks/Task')
};