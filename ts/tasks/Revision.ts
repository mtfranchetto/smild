import {IBuildHelper} from "../BuildHelper";
const gulp = require('gulp');
const RevAll = require('gulp-rev-all');

export default (helper: IBuildHelper) => {
    let settings = helper.getSettings();
    if (!helper.isRelease()) return Promise.resolve();
    if (settings.revisionExclude === "*") {
        return gulp.src(helper.getTempFolder() + '**')
            .pipe(gulp.dest(helper.getDistFolder()));
    }
    let excludedFiles = _.union(
        ['favicon.ico', 'index.html'],
        _.map(settings.revisionExclude, rule => rule.regexp ? new RegExp(rule.pattern) : rule.pattern)),
        revTransform = new RevAll({
            dontRenameFile: excludedFiles,
            dontUpdateReference: excludedFiles
        });
    return gulp.src(helper.getTempFolder() + '**')
        .pipe(revTransform.revision())
        .pipe(gulp.dest(helper.getDistFolder()));
}