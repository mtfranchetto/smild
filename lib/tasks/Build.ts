import {buildHelper as helper, taskRunner} from "../Container";
import {cyan} from "chalk";
const gulp = require("gulp");
import Styles from "./Styles";
import Images from "./Images";
import Assets from "./Assets";
import Browserify from "./Browserify";
import Revision from "./Revision";
import Manifest from "./Manifest";
import CopyIndex from "./CopyIndex";
import {PreBuild, PostBuild} from "./Hooks";
import {map} from "lodash";

export default function Build() {
    let targets: string[] = [];
    if (helper.isWatching() || helper.getCurrentTarget() !== "all") {
        targets = [helper.getCurrentTarget()];
    } else {
        targets = helper.getTargets();
    }
    return Promise.all(map(targets, async function (target: string) {
        helper.setTarget(target);
        console.log(cyan("Building target", target));
        await taskRunner.run(gulp.series(PreBuild, gulp.parallel([CopyIndex, Styles, Images, Assets, Browserify]), Revision, Manifest, PostBuild));
        console.log(cyan("Finished target", target));
    }));
}


