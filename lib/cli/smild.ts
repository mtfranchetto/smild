#!/usr/bin/env node

import * as chalk from "chalk";
import * as _ from "lodash";
import * as Mappings from "../tasks/Mappings";
import {buildHelper, taskRunner} from "../Container";
import Util from "../Util";
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

gulp.on('error', event => {
    if (hasCommandRegistered(event.name))
        console.log(
            '\'' + chalk.yellow(event.name) + '\'',
            chalk.red('errored')
        );
    console.error(Util.formatError(event));
});

process.env.TARGET = target;
process.env.DEBUG = !program.release;

buildHelper.setTarget(target);
if (program.type)
    buildHelper.setProjectType(program.type);
if (program.release)
    buildHelper.enableRelease();

if (command && !hasCommandRegistered(command))
    console.log(chalk.red(command, "not found."));
else
    taskRunner.run(Mappings[buildHelper.getProjectType()][command], command);

function hasCommandRegistered(taskName: string) {
    return _.has(Mappings[buildHelper.getProjectType()], taskName);
}