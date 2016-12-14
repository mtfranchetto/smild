#!/usr/bin/env node

import * as chalk from "chalk";
import * as _ from "lodash";
import * as Mappings from "../tasks/Mappings";
import {buildHelper, taskRunner} from "../Container";
import Util from "../Util";
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
    if (hasCommandRegistered(event.name))
        console.log('Starting', '\'' + chalk.yellow(event.name) + '\'...');
});

gulp.on('stop', event => {
    if (hasCommandRegistered(event.name))
        console.log(
            'Finished', '\'' + chalk.yellow(event.name) + '\'',
            'after', chalk.blue(prettyTime(event.duration))
        );
});

gulp.on('error', event => {
    if (hasCommandRegistered(event.name))
    console.log(
        '\'' + chalk.yellow(event.name) + '\'',
        chalk.red('errored after'),
        chalk.blue(prettyTime(event.duration))
    );
    console.error(Util.formatError(event));
});



buildHelper.setTarget(target);
buildHelper.setProjectType(program.type || "frontend");
if (program.release)
    buildHelper.enableRelease();

if (command && !hasCommandRegistered(command))
    console.log(chalk.red(command, "not found."));
else
    taskRunner.run(Mappings[buildHelper.getProjectType()][command]);

function hasCommandRegistered(taskName:string) {
    return _.has(Mappings[buildHelper.getProjectType()], taskName);
}