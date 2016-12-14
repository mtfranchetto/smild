import {IBuildHelper} from "../BuildHelper";
const gulp = require('gulp');
const replace = require('gulp-replace');
import * as path from "path";

export default (helper: IBuildHelper) => {
    let settings = helper.getSettings(),
        projectPath = path.resolve(__dirname, "../../../scaffolding", settings.projectType);
    return gulp.src(projectPath + '/**/*')
        .pipe(replace("$$NAME", helper.getCurrentTarget()))
        .pipe(gulp.dest("./"));
}