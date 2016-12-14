import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require('gulp');
const replace = require('gulp-replace');
import * as path from "path";

export default function Scaffolding() {
    let projectPath = path.resolve(__dirname, "../../../scaffolding", helper.getProjectType());
    return gulp.src(projectPath + '/**/*')
        .pipe(replace("$$NAME", helper.getCurrentTarget()))
        .pipe(gulp.dest("./"));
}