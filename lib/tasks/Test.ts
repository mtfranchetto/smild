import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require("gulp");
const mocha = require("gulp-mocha");

export default function Test() {
    return gulp.src(helper.getSettings().test, {read: false})
        .pipe(mocha({
            reporter: 'spec',
            compilers: {
                ts: require('ts-node/register')
            }
        }))
        .on("error", () => process.exit(1));
}