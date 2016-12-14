import {IBuildHelper} from "../BuildHelper";
const mocha = require("gulp-mocha");
const gulp = require("gulp");

export default (helper: IBuildHelper) => {
    return gulp.src(helper.getSettings().test, {read: false})
        .pipe(mocha({
            reporter: 'spec',
            compilers: {
                ts: require('ts-node/register')
            }
        }));
}