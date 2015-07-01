module.exports = function (gulp, options) {

    var fs = require('fs'),
        path = require('path'),
        _ = require('lodash'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        streamify = require('gulp-streamify'),
        watchify = require('watchify'),
        gulpif = require('gulp-if'),
        babelify = require('babelify'),
        merge = require('merge-stream'),
        autoprefixer = require('gulp-autoprefixer'),
        minify = require('gulp-minify-css'),
        concat = require('gulp-concat'),
        embedlr = require('gulp-embedlr'),
        header = require('gulp-header'),
        rename = require('gulp-rename'),
        changed = require('gulp-changed'),
        minimist = require('minimist'),
        exorcist = require('exorcist'),
        transform = require('vinyl-transform'),
        sass = require('gulp-sass'),
        karma = require('karma').server,
        sourcemaps = require('gulp-sourcemaps'),
        uglify = require('gulp-uglify'),
        express = require('express'),
        refresh = require('gulp-livereload'),
        async = require('async'),
        livereload = require('connect-livereload'),
        serverport = options.serverPort,
        server = express();

    var DIST_FOLDER = options.distribution,
        KARMA_CONFIG = '/karma.conf.js',
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
            variants = getDirectories(path.resolve(cwd, options.bootstrappers));
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
        var bootstrapperPath = path.resolve(options.bootstrappers, getVariantPart(), 'bootstrapper.scss');
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

    !options.module && gulp.task('browserify', function () {
        process.env.DEBUG = currentVariant.indexOf('debug') > -1;
        process.env.TARGET = getVariantPart();

        var browserifyOptions = {
            entries: [path.resolve(options.bootstrappers, getVariantPart(), 'bootstrapper.js')],
            basedir: cwd,
            debug: !isRelease(),
            cache: {},
            packageCache: {},
            fullPaths: true
        };

        var bundleStream = watching ? watchify(browserify(browserifyOptions)) :
            browserify(browserifyOptions);

        bundleStream = bundleStream.transform(babelify.configure({
            extensions: [".es6", ".es"],
            sourceMapRelative: '.'
        }));

        if (watching)
            bundleStream.on('update', rebundle);

        function rebundle() {
            return bundleStream.bundle()
                .on('error', function (err) {
                    console.error(err.message);
                    this.end();
                })
                .pipe(source(BUNDLE_FILENAME + '.js'))
                .pipe(gulpif(isRelease(), streamify(uglify())))
                .pipe(gulpif(isRelease(), header('/*\n\n${name} : ${version}\n\n*/\n\n', {
                    name: options.projectPackage.name,
                    version: options.projectPackage.version
                })))
                .pipe(gulpif(!isRelease(), transform(function () {
                    return exorcist(getTemporaryDirectory() + 'js/' + BUNDLE_FILENAME + '.map.js');
                })))
                .pipe(gulp.dest(getTemporaryDirectory() + 'js'))
                .pipe(gulpif(watching, refresh(lrserver)));
        }

        return rebundle();
    });

    gulp.task('test', function (done) {
        karma.start({
            configFile: __dirname + KARMA_CONFIG,
            singleRun: !watching
        }, watching ? done : null);
    });

    !options.module && gulp.task('watch', function () {
        watching = true;
        currentVariant = getVariantOption("debug-main");
        variantToRemove = currentVariant;

        gulp.series('build', 'serve', function () {
            gulp.watch([path.resolve(options.bootstrappers, getVariantPart(), 'bootstrapper.scss'),
                    path.resolve(options.bootstrappers, 'base.scss'),
                    './' + options.styles + '/**/*.scss'], {maxListeners: 999},
                ['styles']);

            gulp.watch([options.views + '/**/*.html'], {maxListeners: 999}, ['views']);
        });
    });

    gulp.task('watch-test', function () {
        watching = true;
        gulp.series('test');
    });
};