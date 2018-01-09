import {buildHelper as helper, taskRunner} from "../Container";
import Util from "../Util";
const gulp = require("gulp4");
const mocha = require("gulp-mocha");

export default function Test() {
    return gulp.src(helper.getSettings().test, {read: false})
        .pipe(mocha({
            reporter: 'spec',
            compilers: {
                ts: require('ts-node/register')
            }
        }))
        .on("error", (error) => {
            console.error(Util.formatError(error));
            process.exit(1)
        });
}