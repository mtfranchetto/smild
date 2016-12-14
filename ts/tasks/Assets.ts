import {IBuildHelper} from "../BuildHelper";
const gulp = require('gulp');

export default (helper: IBuildHelper) => {
    let settings = helper.getSettings();
    return gulp.src(settings.assets + '/**/*')
        .pipe(gulp.dest(helper.getTempFolder() + settings.assets + '/'));
}