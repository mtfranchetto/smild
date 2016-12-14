#!/usr/bin/env node

import * as chalk from "chalk";
import ProjectType from "../ProjectType";
import {TaskRunner} from "../TaskRunner";
import {BuildHelper} from "../BuildHelper";
import * as _ from "lodash";
const prettyTime = require('pretty-hrtime');
const gulp = require("gulp");

let program = require("commander"),
    packageJson = require('../../package.json'),
    command = null,
    target = null,
    gulp = require('gulp');

program
    .version(packageJson.version)
    .option('-r, --release', 'Enable release mode')
    .option('-t, --type [projectType]', 'Specify the project type for scaffolding')
    .arguments('<command> [target]')
    .action(function (_command, _target) {
        command = _command;
        target = _target || "main"
    })
    .parse(process.argv);

process.env.TARGET = target;
process.env.DEBUG = !program.release;

const buildManager = new BuildHelper(),
    taskRunner = new TaskRunner();

_.forEach(availableTasks, TaskConstructor => {
    var task = new TaskConstructor(buildManager, taskRunner);
    if (_.indexOf(task.availableTo, buildManager.options.projectType) > -1)
        gulp.task(task.command, gulp.series.apply(gulp, _.union(task.dependsOn, [_.bind(task.action, task)])));
});

const registeredTasks = buildManager.getTasksList();

gulp.on('start', event => {
    if (_.indexOf(registeredTasks, event.name) < 0) return;
    console.log('Starting', '\'' + chalk.yellow(event.name) + '\'...');
});

gulp.on('stop', event => {
    if (_.indexOf(registeredTasks, event.name) < 0) return;
    console.log(
        'Finished', '\'' + chalk.yellow(event.name) + '\'',
        'after', chalk.blue(prettyTime(event.duration))
    );
});

if (command && _.indexOf(smild.buildManager.getTasksList(), command) < 0) {
    console.log(chalk.red(command, "task not found."));
    return;
}

smild.buildManager.setTarget(target);
smild.buildManager.isRelease(program.release || false);
smild.buildManager.setProjectType(program.type || ProjectType.FRONTEND);
smild.taskRunner.run(command);