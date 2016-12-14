import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require('gulp');
const nodemon = require("gulp-nodemon");
import * as path from "path";
import {merge} from "lodash";

export default function NodeWatchBuild() => {
    let settings = helper.getSettings();
    nodemon(merge({
        script: 'bootstrapper.ts',
        ext: 'js json ts',
        execMap: {
            "ts": path.resolve(__dirname, "../../../node_modules/ts-node/dist/bin/ts-node.js")
        }
    }, settings.nodemon));
}