import * as browserify from "browserify";
import * as path from "path";
import TypescriptSettingsParser from "../settings/TypescriptSettingsParser";
import {buildHelper as helper, taskRunner} from "../Container";
const watchify = require('watchify'),
    gulp = require("gulp"),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    transform = require('vinyl-transform'),
    exorcist = require('exorcist'),
    tsify = require('tsify'),
    refresh = require('gulp-livereload'),
    buffer = require('vinyl-buffer');

export default function Browserify() {
    let smildSettings = helper.getSettings(),
        browserifySettings = {
            entries: [getBootstrapperPath()],
            basedir: process.cwd(),
            debug: !helper.isRelease(),
            cache: {},
            packageCache: {},
            fullPaths: true
        },
        bundleStream = helper.isWatching() ? watchify(browserify(browserifySettings), {
            poll: /^win/.test(process.platform)
        }) : browserify(browserifySettings);

    bundleStream = bundleStream.plugin(tsify, new TypescriptSettingsParser().parse().compilerOptions);

    if (helper.isWatching())
        bundleStream.on('update', () => this.rebundle(bundleStream));

    bundleStream = bundleStream.bundle()
        .on('error', function (err) {
            console.error(err.message);
            this.emit("end");
        })
        .pipe(source('main.js'));

    function getBootstrapperPath() {
        let target = helper.getCurrentTarget();
        return path.resolve(smildSettings.targets, target, 'bootstrapper.ts');
    }

    function rebundleDevelopment(bundleStream) {
        return bundleStream
            .pipe(transform(() => {
                return exorcist(helper.getTempFolder() + '/js/main.map.js');
            }))
            .pipe(gulp.dest(helper.getTempFolder() + '/js'))
            .pipe(refresh({
                start: helper.isWatching(),
                port: smildSettings.liveReloadPort
            }));
    }

    function rebundleRelease(bundleStream) {
        return bundleStream
            .pipe(streamify(uglify(smildSettings.uglifyjs)))
            .pipe(buffer())
            .pipe(gulp.dest(helper.getTempFolder() + '/js'));
    }

    return helper.isRelease() ? rebundleRelease(bundleStream) : rebundleDevelopment(bundleStream);
}