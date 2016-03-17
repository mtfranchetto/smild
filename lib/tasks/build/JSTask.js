"use strict";

const Task = require('../Task'),
    gulp = require('gulp'),
    path = require('path'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    gulpif = require('gulp-if'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    transform = require('vinyl-transform'),
    exorcist = require('exorcist'),
    tsify = require('tsify'),
    refresh = require('gulp-livereload');

class JSTask extends Task {

    constructor(buildHelper) {
        super(buildHelper);
        this.command = "js";
        this.availableToModule = false;
    }

    action() {
        var options = this._buildHelper.options,
            target = this._buildHelper.currentTarget,
            buildHelper = this._buildHelper;

        var browserifyOptions = {
                entries: [path.resolve(options.targets, target, 'bootstrapper.' + (buildHelper.options.typescript ? 'ts' : 'js'))],
                basedir: this._buildHelper.CWD,
                debug: !this._buildHelper.isRelease(),
                cache: {},
                packageCache: {},
                fullPaths: true
            },
            bundleStream = this._buildHelper.isWatching() ? watchify(browserify(browserifyOptions), {
                poll: /^win/.test(process.platform)
            }) : browserify(browserifyOptions);

        if (options.typescript)
            bundleStream = bundleStream.plugin(tsify, options.typescript);
        if (options.babel)
            bundleStream = bundleStream.transform(babelify, options.babel);

        if (this._buildHelper.isWatching())
            bundleStream.on('update', rebundle);

        function rebundle() {
            return bundleStream.bundle()
                .on('error', function (err) {
                    console.error(err.message);
                    this.emit("end");
                })
                .pipe(source(buildHelper.BUNDLE_FILENAME + '.js'))
                .pipe(gulpif(buildHelper.isRelease(), streamify(uglify())))
                .pipe(gulpif(buildHelper.isRelease(), header('/*\n\n${name} : ${version}\n\n*/\n\n', {
                    name: options.projectPackage.name,
                    version: options.projectPackage.version
                })))
                .pipe(gulpif(!buildHelper.isRelease(), transform(function () {
                    return exorcist(buildHelper.getTemporaryDirectory() + 'js/' + buildHelper.BUNDLE_FILENAME + '.map.js');
                })))
                .pipe(gulp.dest(buildHelper.getTemporaryDirectory() + 'js'))
                .pipe(refresh({
                    start: buildHelper.isWatching(),
                    port: buildHelper.options.liveReloadPort
                }));
        }

        return rebundle();
    }
}

module.exports = JSTask;