import {buildHelper as helper, taskRunner} from "../Container";
import * as path from "path";
import Build from "./Build";
import Serve from "./Serve";
import Styles from "./Styles";
import Clean from "./Clean";
const gulp = require("gulp");

export default function FrontendWatchBuild() {
    helper.enableWatch();
    taskRunner.run(gulp.series(Clean, Build, Serve)).then(() => {
        gulp.watch(path.resolve(process.cwd()) + '/**/*.scss',  gulp.parallel(Styles));
    });
}