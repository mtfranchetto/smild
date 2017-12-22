import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require("gulp4");
const run = require("gulp-run");
import * as path from "path";

export default function Coverage() {
    let settings = helper.getSettings(),
        modulesPath = path.resolve(__dirname, "../../node_modules"),
        nyc = path.join(modulesPath, '.bin/nyc'),
        tsNode = path.join(modulesPath, 'ts-node/register'),
        mocha = path.join(modulesPath, '.bin/_mocha'),
        nycSettings = "";
    nycSettings += `--include '${settings.scripts}'`;
    nycSettings += ` --exclude node_modules --exclude ${settings.distribution}`;
    nycSettings += " --extension .ts --extension .tsx";
    nycSettings += " --reporter text-summary --reporter html";
    nycSettings += " --sourceMap true --instrument true";
    let command = new run.Command(`${nyc} ${nycSettings} --require ${tsNode} ${mocha} -- '${settings.test}'`, {
        silent: true
    });
    return new Promise((resolve, reject) => {
        command.exec(undefined, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}