import {buildHelper as helper, taskRunner} from "../Container";
import * as path from "path";
import Build from "./Build";
import Serve from "./Serve";
import Styles from "./Styles";
import Clean from "./Clean";
const gulp = require("gulp");

export default function FrontendWatchBuild() {
    let settings = helper.getSettings(),
        target = helper.getCurrentTarget();
    helper.enableWatch();
    taskRunner.run(gulp.series(Clean, Build, Serve)).then(() => {
        gulp.watch([path.resolve(settings.targets, target, 'bootstrapper.scss'),
            path.resolve(settings.targets, 'base.scss'),
            path.resolve(process.cwd(), settings.styles) + '/**/*.scss'], gulp.parallel(Styles));
    });
}