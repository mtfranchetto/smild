module.exports = function (gulp, options) {

    var jshint = require('gulp-jshint'),
        del = require('del'),
        fs = require('fs'),
        path = require('path'),
        _ = require('lodash'),
        runSequence = require('run-sequence').use(gulp),
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
        RevAll = require('gulp-rev-all'),
        karma = require('karma').server,
        markdox = require('gulp-markdox'),
        manifest = require('gulp-manifest'),
        uglify = require('gulp-uglify'),
        plato = require('plato'),
        express = require('express'),
        refresh = require('gulp-livereload'),
        async = require('async'),
        livereload = require('connect-livereload'),
        lrserver = require('tiny-lr')(),
        livereloadport = 35729,
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

    if (!options.module) {
        server.use(express.static(getDistDirectory()));
        server.use(livereload({port: livereloadport}));

        server.all('/*', function (req, res) {
            res.sendfile('index.html', {root: getDistDirectory()});
        });
    }

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
            runSequence(['views', 'styles', 'images', 'assets', 'browserify'], 'rev', 'manifest', 'post-build', callback);
        });
    });

    !options.module && gulp.task('rev', function () {
        var excludedFiles = _.union(
            ['favicon.ico', 'index.html'],
            _.map(options.revisionExclude, function (rule) {
                return rule.regexp ? new RegExp(rule.pattern) : rule.pattern;
            }));
        var revTransform = new RevAll({
            dontRenameFile: excludedFiles,
            dontUpdateReference: excludedFiles
        });
        if (!isRelease()) return;
        return gulp.src(getTemporaryDirectory() + '**')
            .pipe(revTransform.revision())
            .pipe(gulp.dest(getDistDirectory()))
            .pipe(revTransform.manifestFile())
            .pipe(gulp.dest(getDistDirectory()));
    });

    gulp.task('clean', function (done) {
        del([path.resolve(DIST_FOLDER, variantToRemove), TEMPORARY_FOLDER], {force: true}, done);
    });

    gulp.task('lint', function () {
        return gulp.src(options.coverage + '**/*')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    gulp.task('doc', function () {
        return gulp.src(options.coverage + "**/*")
            .pipe(markdox())
            .pipe(concat("doc.md"))
            .pipe(gulp.dest("./doc"));
    });

    !options.module && gulp.task('styles', function () {
        return gulp.src(path.resolve(options.bootstrappers, getVariantPart(), 'bootstrapper.scss'))
            .pipe(concat(BUNDLE_FILENAME + '.css'))
            .pipe(sass({
                includePaths: ['./'],
                onError: function (error) {
                    console.log(error)
                }
            }))
            .pipe(autoprefixer({browsers: options.autoprefixerRules}))
            .pipe(gulpif(isRelease(), minify()))
            .pipe(gulp.dest(getTemporaryDirectory() + 'css/'))
            .pipe(gulpif(watching, refresh(lrserver)));
    });

    !options.module && gulp.task('browserify', function () {
        process.env.DEBUG = currentVariant.indexOf('debug') > -1;
        process.env.TARGET = getVariantPart();

        var browserifyOptions = {
            entries: [path.resolve(options.bootstrappers, getVariantPart(), 'bootstrapper.js')],
            noParse: _.map(options.bundleNoParse, function (package) {
                return require.resolve(package);
            }),
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
                    console.log(err.message);
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

    !options.module && gulp.task('views', function () {
        var streams = [
            gulp.src(options.views + '/**/*.html')
                .pipe(changed(getTemporaryDirectory() + options.views + '/'))
                .pipe(gulp.dest(getTemporaryDirectory() + options.views + '/'))
                .pipe(gulpif(watching, refresh(lrserver)))];
        if (options.singlePage) {
            streams.push(
                gulp.src('index.html')
                    .pipe(gulpif(watching, embedlr()))
                    .pipe(gulp.dest(getTemporaryDirectory())));
        }
        return merge(streams);
    });

    !options.module && gulp.task('images', function () {
        return gulp.src(options.images + '/**/*')
            .pipe(gulp.dest(getTemporaryDirectory() + options.images + '/'));
    });

    !options.module && gulp.task('assets', function () {
        return gulp.src(options.assets + '/**/*')
            .pipe(gulp.dest(getTemporaryDirectory() + options.assets + '/'));
    });

    !options.module && gulp.task('pre-build', function () {
        if (!options.preBuild.length) return;
        return merge(
            _.map(options.preBuild, function (action) {
                return gulp.src(action.source)
                    .pipe(gulpif(!!action.ext, rename(function (path) {
                        path.extname = "." + action.ext;
                    })))
                    .pipe(gulp.dest(action.dest));
            })
        );
    });

    !options.module && gulp.task('post-build', function () {
        if (!options.postBuild.length) return;
        return merge(
            _.map(options.postBuild, function (action) {
                return gulp.src(action.source)
                    .pipe(gulpif(!!action.ext, rename(function (path) {
                        path.extname = "." + action.ext;
                    })))
                    .pipe(gulp.dest(getDistDirectory() + action.dest));
            })
        );
    });

    !options.module && gulp.task('watch', function () {
        watching = true;
        currentVariant = getVariantOption("debug-main");
        variantToRemove = currentVariant;

        gulp.start('build', 'serve', function () {
            gulp.watch([path.resolve(options.bootstrappers, getVariantPart(), 'bootstrapper.scss'),
                    path.resolve(options.bootstrappers, 'base.scss'),
                    './' + options.styles + '/**/*.scss'], {maxListeners: 999},
                ['styles']);

            gulp.watch([options.views + '/**/*.html'], {maxListeners: 999}, ['views']);
        });
    });

    gulp.task('watch-test', function () {
        watching = true;
        gulp.start('test');
    });

    !options.module && gulp.task('serve', function () {
        if (!options.singlePage) return; //non single page application

        if (!currentVariant)
            currentVariant = getVariantOption("debug-main");

        server.listen(serverport);
        refresh.listen(livereloadport);
        console.log('Variant ' + currentVariant + ' listening on http://localhost:' + serverport);
    });

    gulp.task('analysis', function (done) {
        plato.inspect(options.analysis, options.analysisOutput, {
            recurse: true
        }, _.ary(done, 0));
    });

    !options.module && gulp.task('manifest', function () {
        if (!isRelease() || !options.manifest)
            return;
        gulp.src([getDistDirectory() + '**/*'])
            .pipe(manifest(options.manifest))
            .pipe(gulp.dest(getDistDirectory()));
    });

    gulp.task('default', [!options.module ? 'build' : 'test']);

    function getDirectories(rootDir) {
        var files = fs.readdirSync(rootDir),
            directories = [];
        _.forEach(files, function (file) {
            if (file[0] != '.') {
                var filePath = rootDir + '/' + file,
                    stat = fs.statSync(filePath);
                if (stat.isDirectory())
                    directories.push(file);
            }
        });
        return directories;
    }

    function isRelease() {
        return currentVariant.indexOf("release") > -1;
    }

    function getDistDirectory() {
        return getTargetFolder(DIST_FOLDER);
    }

    function getTemporaryDirectory() {
        var folder = isRelease() ? TEMPORARY_FOLDER : DIST_FOLDER; //When running debug use always the dist folder (because revisioning is disabled)
        return getTargetFolder(folder);
    }

    function getTargetFolder(folder) {
        if (!options.singlePage)
            return path.resolve(folder, getVariantPart()) + '/';
        return path.resolve(folder, currentVariant) + '/';
    }

    function getVariantPart() {
        return currentVariant.slice(currentVariant.indexOf('-') + 1);
    }

    function getVariantOption(defaultOption) {
        return minimist(process.argv.slice(2), {
            string: 'variant',
            default: {variant: defaultOption || 'release-main'}
        }).variant;
    }
};