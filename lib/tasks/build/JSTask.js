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

    constructor(buildManager) {
        super(buildManager);
        this.command = "js";
        this.availableToModule = false;
    }

    action() {
        var options = this._buildManager.options,
            target = this._buildManager.currentTarget,
            buildManager = this._buildManager;

        var browserifyOptions = {
                entries: [path.resolve(options.targets, target, 'bootstrapper.' + (buildManager.options.typescript ? 'ts' : 'js'))],
                basedir: this._buildManager.CWD,
                debug: !this._buildManager.isRelease(),
                cache: {},
                packageCache: {},
                fullPaths: true
            },
            bundleStream = this._buildManager.isWatching() ? watchify(browserify(browserifyOptions), {
                poll: /^win/.test(process.platform)
            }) : browserify(browserifyOptions);

        if (options.typescript)
            bundleStream = bundleStream.plugin(tsify, options.typescript);
        if (options.babel)
            bundleStream = bundleStream.transform(babelify, options.babel);

        if (this._buildManager.isWatching())
            bundleStream.on('update', rebundle);

        function rebundle() {
            return bundleStream.bundle()
                .on('error', function (err) {
                    console.error(err.message);
                    this.emit("end");
                })
                .pipe(source(buildManager.BUNDLE_FILENAME + '.js'))
                .pipe(gulpif(buildManager.isRelease(), streamify(uglify())))
                .pipe(gulpif(buildManager.isRelease(), header('/*\n\n${name} : ${version}\n\n*/\n\n', {
                    name: options.projectPackage.name,
                    version: options.projectPackage.version
                })))
                .pipe(gulpif(!buildManager.isRelease(), transform(function () {
                    return exorcist(buildManager.getTemporaryDirectory() + 'js/' + buildManager.BUNDLE_FILENAME + '.map.js');
                })))
                .pipe(gulp.dest(buildManager.getTemporaryDirectory() + 'js'))
                .pipe(refresh({
                    start: buildManager.isWatching(),
                    port: buildManager.options.liveReloadPort
                }));
        }

        return rebundle();
    }
}

module.exports = JSTask;