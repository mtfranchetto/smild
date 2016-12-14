import {IBuildHelper} from "../BuildHelper";
const gulp = require('gulp');
const manifest = require("gulp-manifest");

export default (helper: IBuildHelper) => {
    let settings = helper.getSettings();
    if (!helper.isRelease() || !settings.manifest) return Promise.resolve();
    return gulp.src(helper.getDistFolder() + '**/*')
        .pipe(manifest(settings.manifest))
        .pipe(gulp.dest(helper.getDistFolder));
}