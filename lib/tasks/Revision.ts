import {buildHelper as helper, taskRunner} from "../Container";
import * as _ from "lodash";
const gulp = require('gulp');
const RevAll = require('gulp-rev-all');

export default function Revision() {
    let settings = helper.getSettings();
    if (!helper.isRelease()) return Promise.resolve();
    if (settings.revisionExclude === "*") {
        return gulp.src(helper.getTempFolder() + '/**')
            .pipe(gulp.dest(helper.getDistFolder()));
    }
    let excludedFiles = _.union(
        ['favicon.ico', 'index.html'],
        _.map(settings.revisionExclude, (rule:any) => rule.regexp ? new RegExp(rule.pattern) : rule.pattern)),
        revTransform = new RevAll({
            dontRenameFile: excludedFiles,
            dontUpdateReference: excludedFiles
        });
    return gulp.src(helper.getTempFolder() + '/**')
        .pipe(revTransform.revision())
        .pipe(gulp.dest(helper.getDistFolder()));
}