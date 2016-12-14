import {buildHelper as helper, taskRunner} from "../Container";
import * as path from "path";
import * as fs from "fs";
const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    refresh = require('gulp-livereload');

export default function Styles() {
    let settings = helper.getSettings();
    let bootstrapperPath = path.resolve(settings.targets, helper.getCurrentTarget(), 'bootstrapper.scss');
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
            .pipe(gulp.dest(helper.getTempFolder() + 'css/'));
    }

    function bundleDevelopment(stream) {
        return stream
            .pipe(sourcemaps.init())
            .pipe(concat('main.css'))
            .pipe(applySass())
            .pipe(autoprefixer({browsers: settings.autoprefixerRules}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(helper.getDistFolder() + 'css/'))
            .pipe(refresh({
                start: helper.isWatching(),
                port: settings.liveReloadPort
            }));
    }

    function applySass() {
        return sass({
            includePaths: ['./'],
            importer: (file, prev, done) => {
                var cssExtension = '.css';
                if (file.indexOf(cssExtension, file.length - cssExtension.length) !== -1) {
                    try {
                        var fileContents = fs.readFileSync(path.resolve(bootstrapperPath, '..', file), 'utf8'); //Resolve relative paths from bootstrapper file
                        done({contents: fileContents});
                    } catch (error) {
                        done(error);
                    }
                } else {
                    done({file: file});
                }
            }
        }).on('error', sass.logError)
    }

    return helper.isRelease() ? bundleRelease(stream) : bundleDevelopment(stream);
}