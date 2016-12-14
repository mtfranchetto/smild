import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require("gulp");
const tsc = require("gulp-typescript");

export default function Typescript() {
    let settings = helper.getSettings(),
        tsConfig = tsc.createProject("tsconfig.json");
    return gulp.src([settings.scripts + "/**/*.{ts,tsx}"])
        .pipe(tsc(tsConfig))
        .on("error", function (error) {
            process.exit(1);
        })
        .pipe(gulp.dest(settings.distribution));
}