import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require('gulp');

export default function Images() => {
    let settings = helper.getSettings();
    return gulp.src(settings.images + '/**/*')
        .pipe(gulp.dest(helper.getTempFolder() + settings.images + '/'));
}