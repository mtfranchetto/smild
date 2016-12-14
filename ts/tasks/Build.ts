import {IBuildHelper} from "../BuildHelper";
import ITaskRunner from "../ITaskRunner";
import {cyan} from "chalk";
const gulp = require("gulp");
import * as Promise from "bluebird";

export default (helper: IBuildHelper, taskRunner: ITaskRunner) => {
    let targets: string[] = [];
    if (helper.isWatching() || helper.getCurrentTarget() !== 'all') {
        targets = [helper.getCurrentTarget()];
    } else {
        targets = helper.getTargets();
    }
    return Promise.resolve<any>(targets)
        .mapSeries((target: string) => {
            helper.setTarget(target);
            console.log(cyan("Building target", target));
            return taskRunner.run(gulp.series(gulp.parallel(['styles', 'images', 'assets', 'js']), 'rev', 'manifest', 'postbuild-hook'))
                .then(() => console.log(cyan("Finished target", target)));
        });
}