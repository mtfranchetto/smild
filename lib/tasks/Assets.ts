import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require('gulp');

export default function Assets() {
    let settings = helper.getSettings();
    return gulp.src(settings.assets + '/**/*')
        .pipe(gulp.dest(helper.getTempFolder() + settings.assets + '/'));
}