import {buildHelper as helper, taskRunner} from "../Container";
import Typescript from "./Typescript";
const gulp = require("gulp4");
import {magenta} from "chalk";

export default function ModuleWatchBuild() {
    let settings = helper.getSettings();
    helper.enableWatch();
    taskRunner.run(gulp.series(Typescript)).then(() => {
        console.log(magenta("Project reloaded"));
        gulp.watch(settings.scripts, async (done) => {
            await taskRunner.run(Typescript);
            console.log(magenta("Project reloaded"));
            done();
        });
    });
}