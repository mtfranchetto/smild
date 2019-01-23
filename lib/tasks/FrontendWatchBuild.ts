import {buildHelper as helper, taskRunner} from "../Container";
import * as path from "path";
import Build from "./Build";
import Serve from "./Serve";
import Styles from "./Styles";
import Clean from "./Clean";

const gulp = require("gulp4");
import {union, map} from "lodash";

export default function FrontendWatchBuild() {
    helper.enableWatch();
    taskRunner.run(gulp.series(Clean, Build, Serve)).then(() => {
        let settings = helper.getSettings();
        let bootstrapperBasePath = (settings.bootstrapperStyles) ? settings.bootstrapperStyles :
            path.resolve(process.cwd(), settings.targets, helper.getCurrentTarget());

        let watchFolders = map(settings.watchStyles, folder => path.resolve(process.cwd(), folder) + "/**/*.{scss, css}");

        gulp.watch(union([bootstrapperBasePath], watchFolders), gulp.parallel(Styles));
    });
}