"use strict";

const Task = require('../Task'),
    merge = require('merge-stream'),
    _ = require('lodash'),
    gulpif = require('gulp-if'),
    gulp = require('gulp'),
    embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    changed = require('gulp-changed');

class ViewsTask extends Task {

    constructor(buildManager) {
        super(buildManager);
        this.command = "views";
        this.availableToModule = false;
    }

    action() {
        return merge(
            gulp.src(this._buildManager.options.views + '/**/*.html')
                .pipe(changed(this._buildManager.getTemporaryDirectory() + this._buildManager.options.views + '/'))
                .pipe(gulp.dest(this._buildManager.getTemporaryDirectory() + this._buildManager.options.views + '/'))
                .pipe(refresh({
                    start: this._buildManager.isWatching(),
                    port: this._buildManager.options.liveReloadPort
                })),
            gulp.src('index.html')
                .pipe(gulpif(this._buildManager.isWatching(), embedlr({
                    port: this._buildManager.options.liveReloadPort
                })))
                .pipe(gulp.dest(this._buildManager.getTemporaryDirectory()))
        );
    }
}

module.exports = ViewsTask;