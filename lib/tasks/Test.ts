import {buildHelper as helper, taskRunner} from "../Container";
const mocha = require("gulp-mocha");
const gulp = require("gulp");

export default function Test() {
    return gulp.src(helper.getSettings().test, {read: false})
        .pipe(mocha({
            reporter: 'spec',
            compilers: {
                ts: require('ts-node/register')
            }
        }));
}