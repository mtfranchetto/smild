import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require("gulp");
const ts = require("gulp-typescript");

export default function Typescript() {
    let settings = helper.getSettings(),
        tsProject = ts.createProject("tsconfig.json");

    return gulp.src(settings.scripts).pipe(tsProject()).js.pipe(gulp.dest(settings.distribution));
}