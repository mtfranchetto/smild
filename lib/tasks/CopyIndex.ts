import {buildHelper as helper, taskRunner} from "../Container";
const gulp = require("gulp4");
const embedlr = require("gulp-embedlr");

export default function CopyIndex() {
    let stream = gulp.src('index.html');
    if (helper.isWatching())
        stream = stream.pipe(embedlr({ port: helper.getSettings().liveReloadPort}));
    return stream.pipe(gulp.dest(helper.getTempFolder()));
}