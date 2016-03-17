"use strict";

const Task = require('./Task'),
    gulp = require('gulp'),
    path = require('path'),
    fs = require('fs'),
    gulpif = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    refresh = require('gulp-livereload'),
    Promise = require('bluebird');

class StylesTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "styles";
        this.availableToModule = false;
    }

    action() {
        var bootstrapperPath = path.resolve(this._buildHelper.options.targets, this._buildHelper.currentTarget, 'bootstrapper.scss');
        if (!fs.existsSync(bootstrapperPath)) {
            console.warn("Styles bootstrapper not found at path", bootstrapperPath, ", skipping styles build process.");
            return Promise.resolve();
        }
        return gulp.src(bootstrapperPath)
            .pipe(gulpif(!this._buildHelper.isRelease(), sourcemaps.init()))
            .pipe(concat(this._buildHelper.BUNDLE_FILENAME + '.css'))
            .pipe(sass({
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
            }).on('error', sass.logError))
            .pipe(autoprefixer({browsers: this._buildHelper.options.autoprefixerRules}))
            .pipe(gulpif(!this._buildHelper.isRelease(), sourcemaps.write()))
            .pipe(gulpif(this._buildHelper.isRelease(), minify()))
            .pipe(gulp.dest(this._buildHelper.getTemporaryDirectory() + 'css/'))
            .pipe(refresh({
                start: this._buildHelper.isWatching(),
                port: this._buildHelper.options.liveReloadPort
            }));
    }
}

module.exports = StylesTask;