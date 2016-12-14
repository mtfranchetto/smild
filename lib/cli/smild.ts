#!/usr/bin/env node

import * as chalk from "chalk";
import * as _ from "lodash";
import * as Mappings from "../tasks/Mappings";
import {buildHelper, taskRunner} from "../Container";
const prettyTime = require('pretty-hrtime');
const gulp = require("gulp");

let program = require("commander"),
    packageJson = require('../../package.json'),
    command = null,
    target = null;

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

gulp.on('start', event => {
    if (_.has(Mappings, event.name))
        console.log('Starting', '\'' + chalk.yellow(event.name) + '\'...');
});

gulp.on('stop', event => {
    if (_.has(Mappings, event.name))
        console.log(
            'Finished', '\'' + chalk.yellow(event.name) + '\'',
            'after', chalk.blue(prettyTime(event.duration))
        );
});

if (command && !_.has(Mappings, command)) {
    console.log(chalk.red(command, "not found."));
} else {
    buildHelper.setTarget(target);
    buildHelper.setProjectType(program.type || "frontend");
    if (program.release)
        buildHelper.enableRelease();
    taskRunner.run(Mappings[command]);
}