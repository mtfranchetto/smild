import Clean from "./Clean";
import NodeWatchBuild from "./NodeWatchBuild";
import Test from "./Test";
import Typescript from "./Typescript";
import Build from "./Build";
import WatchBuild from "./WatchBuild";
const gulp = require("gulp");

export const frontend = {
    "clean": Clean,
    "build": Build,
    "watch-build": gulp.series(Clean, WatchBuild),
    "test": Test
};

export const module = {
    "clean": Clean,
    "build": Typescript,
    "test": Test
};

export const node = {
    "clean": Clean,
    "build": Typescript,
    "watch-build": NodeWatchBuild,
    "test": Test
};
