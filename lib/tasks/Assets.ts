import {buildHelper as helper, taskRunner} from "../Container";
import * as path from "path";
const gulp = require("gulp4");

export default function Assets() {
    let settings = helper.getSettings();
    return gulp.src(settings.assets + '/**/*')
        .pipe(gulp.dest(path.join(helper.getTempFolder(), settings.assets)));
}