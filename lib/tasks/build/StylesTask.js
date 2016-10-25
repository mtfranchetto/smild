"use strict";

const Task = require('../Task'),
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
    Promise = require('bluebird'),
    ProjectType = require('../../ProjectType');

class StylesTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.availableTo = [ProjectType.FRONTEND];
        this.command = "styles";
    }

    action() {
        var bootstrapperPath = path.posix.resolve(this._buildManager.options.targets, this._buildManager.currentTarget, 'bootstrapper.scss');

        if (!fs.existsSync(bootstrapperPath)) {
            console.warn("Styles bootstrapper not found at path", bootstrapperPath, ", skipping styles build process.");
            return Promise.resolve();
        }
        return gulp.src(bootstrapperPath)
            .pipe(gulpif(!this._buildManager.isRelease(), sourcemaps.init()))
            .pipe(concat(this._buildManager.BUNDLE_FILENAME + '.css'))
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
            .pipe(autoprefixer({browsers: this._buildManager.options.autoprefixerRules}))
            .pipe(gulpif(!this._buildManager.isRelease(), sourcemaps.write()))
            .pipe(gulpif(this._buildManager.isRelease(), minify()))
            .pipe(gulp.dest(this._buildManager.getTemporaryDirectory() + 'css/'))
            .pipe(refresh({
                start: this._buildManager.isWatching(),
                port: this._buildManager.options.liveReloadPort
            }));
    }
}

module.exports = StylesTask;