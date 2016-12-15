import {buildHelper as helper, taskRunner} from "../Container";
const nodemon = require("nodemon");
import * as path from "path";
import {merge} from "lodash";
import * as chalk from "chalk";

export default function NodeWatchBuild() {
    let settings = helper.getSettings();
    nodemon(merge({
        script: 'bootstrapper.ts',
        ext: 'js json ts',
        execMap: {
            "ts": path.resolve(__dirname, "../../node_modules/ts-node/dist/bin.js")
        }
    }, settings.nodemon)).on('restart', (files) => {
        console.log(chalk.yellow("Restarting NodeJS..."));
    });
}