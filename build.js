module.exports = function (gulp, options) {

    var fs = require('fs'),
        path = require('path'),
        _ = require('lodash'),
        browserify = require('browserify'),
        streamify = require('gulp-streamify'),
        gulpif = require('gulp-if'),
        merge = require('merge-stream'),
        autoprefixer = require('gulp-autoprefixer'),
        minify = require('gulp-minify-css'),
        concat = require('gulp-concat'),
        embedlr = require('gulp-embedlr'),
        rename = require('gulp-rename'),
        changed = require('gulp-changed'),
        minimist = require('minimist'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        express = require('express'),
        refresh = require('gulp-livereload'),
        async = require('async'),
        livereload = require('connect-livereload'),
        serverport = options.serverPort,
        server = express();

    var DIST_FOLDER = options.distribution,
        KARMA_CONFIG = ,
        BUNDLE_FILENAME = options.bundleFilename,
        watching = false,
        cwd = process.cwd(),
        currentVariant = getVariantOption("debug-main"),
        variantToRemove = "",
        TEMPORARY_FOLDER = "tmp";


    !options.module && gulp.task('build', ['clean', 'pre-build'], function () {
        var variants = [];
        if (watching) {
            variants = [currentVariant];
        } else if (currentVariant !== 'all' && currentVariant !== 'all-debug') {
            variants = [currentVariant];
        } else {
            variants = getDirectories(path.resolve(cwd, options.targets));
            variants = _.map(variants, function (variant) {
                return (currentVariant === 'all' ? 'release-' : 'debug-') + variant;
            });
        }
        async.mapSeries(variants, function (variant, callback) {
            currentVariant = variant;
            gulp.series(gulp.parallel(['views', 'styles', 'images', 'assets', 'browserify']), 'rev', 'manifest', 'post-build', callback);
        });
    });

    !options.module && gulp.task('styles', function () {
        var bootstrapperPath = path.resolve(options.targets, getVariantPart(), 'bootstrapper.scss');
        if (!fs.existsSync(bootstrapperPath)) {
            console.warn("Styles bootstrapper not found at path", bootstrapperPath, ", skipping styles build process.");
        }
        return gulp.src(bootstrapperPath)
            .pipe(gulpif(!isRelease(), sourcemaps.init()))
            .pipe(concat(BUNDLE_FILENAME + '.css'))
            .pipe(sass({includePaths: ['./']}).on('error', sass.logError))
            .pipe(autoprefixer({browsers: options.autoprefixerRules}))
            .pipe(gulpif(!isRelease(), sourcemaps.write()))
            .pipe(gulpif(isRelease(), minify()))
            .pipe(gulp.dest(getTemporaryDirectory() + 'css/'))
            .pipe(gulpif(watching, refresh(lrserver)));
    });
};