import {buildHelper as helper, taskRunner} from "../Container";
import * as path from "path";
const gulp = require('gulp');

export default function Images() {
    let settings = helper.getSettings();
    return gulp.src(settings.images + '/**/*')
        .pipe(gulp.dest(path.join(helper.getTempFolder(), settings.images)));
}