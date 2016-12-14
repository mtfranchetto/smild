import {IBuildHelper} from "../BuildHelper";
import * as path from "path";
import ITaskRunner from "../ITaskRunner";
const gulp = require("gulp");

export default (helper: IBuildHelper, taskRunner: ITaskRunner) => {
    let settings = helper.getSettings(),
        target = helper.getCurrentTarget();
    helper.enableWatch();
    taskRunner.run(gulp.series('build', 'serve')).then(() => {
        gulp.watch([path.resolve(settings.targets, target, 'bootstrapper.scss'),
            path.resolve(settings.targets, 'base.scss'),
            path.resolve(process.cwd(), settings.styles) + '/**/*.scss'], gulp.parallel('styles'));
    });
}