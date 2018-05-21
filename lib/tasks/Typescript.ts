import {buildHelper as helper} from "../Container";
const gulp = require("gulp4");
const ts = require("gulp-typescript");

export default function Typescript() {
    let settings = helper.getSettings(),
        tsProject = ts.createProject("tsconfig.json", {typescript: require(settings.typescriptPath)});

    return gulp.src(settings.scripts)
        .pipe(tsProject())
        .on("error", function (error) {
            if (!helper.isWatching())
                process.exit(1);
        })
        .pipe(gulp.dest(settings.distribution));
}