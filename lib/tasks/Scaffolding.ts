import {buildHelper as helper} from "../Container";
const gulp = require('gulp');
const replace = require('gulp-replace');
import * as path from "path";

export default function Scaffolding() {
    let name = helper.getCurrentTarget();
    if (!name) {
        return Promise.reject(new Error("Missing required project name"));
    }
    let projectPath = path.resolve(__dirname, "../../scaffolding", helper.getProjectType());
    return gulp.src(projectPath + '/**/*')
        .pipe(replace("$$NAME", name))
        .pipe(gulp.dest(`./${name}`));
}