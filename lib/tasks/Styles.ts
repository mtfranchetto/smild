import {buildHelper as helper, taskRunner} from "../Container";
import * as path from "path";
import * as fs from "fs";

const gulp = require("gulp4"),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    refresh = require('gulp-livereload');
import * as moduleImporter from 'sass-module-importer';

export default function Styles() {
    let settings = helper.getSettings();
    let bootstrapperBasePath = (settings.bootstrapperStyles) ? settings.bootstrapperStyles :
        path.posix.resolve(settings.targets, helper.getCurrentTarget());

    let bootstrapperPath = path.posix.resolve(bootstrapperBasePath, 'bootstrapper.scss');
    if (!fs.existsSync(bootstrapperPath)) {
        console.warn("Styles bootstrapper not found at path", bootstrapperPath, ", skipping styles build process.");
        return Promise.resolve();
    }

    let stream = gulp.src(bootstrapperPath);

    function bundleRelease(stream) {
        return stream
            .pipe(concat('main.css'))
            .pipe(applySass())
            .pipe(autoprefixer({browsers: settings.autoprefixer}))
            .pipe(minify())
            .pipe(gulp.dest(helper.getTempFolder() + '/css'));
    }

    function bundleDevelopment(stream) {
        return stream
            .pipe(sourcemaps.init())
            .pipe(concat('main.css'))
            .pipe(applySass())
            .pipe(autoprefixer({browsers: settings.autoprefixerRules}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(helper.getDistFolder() + '/css'))
            .pipe(refresh({
                start: helper.isWatching(),
                port: settings.liveReloadPort
            }));
    }

    function applySass() {
        return sass({
            importer: moduleImporter({basedir: process.cwd()})
        }).on('error', sass.logError)
    }

    return helper.isRelease() ? bundleRelease(stream) : bundleDevelopment(stream);
}