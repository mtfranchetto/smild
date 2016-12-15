import {buildHelper as helper, taskRunner} from "../Container";
import {cyan} from "chalk";
const gulp = require("gulp");
import * as Promise from "bluebird";
import Styles from "./Styles";
import Images from "./Images";
import Assets from "./Assets";
import Browserify from "./Browserify";
import Revision from "./Revision";
import Manifest from "./Manifest";
import CopyIndex from "./CopyIndex";
import {PreBuild, PostBuild} from "./Hooks";

export default function Build() {
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
            return taskRunner.run(gulp.series(PreBuild, gulp.parallel([CopyIndex, Styles, Images, Assets, Browserify]), Revision, Manifest, PostBuild))
                .then(() => console.log(cyan("Finished target", target)));
        });
}
