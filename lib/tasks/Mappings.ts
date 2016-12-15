import Clean from "./Clean";
import NodeWatchBuild from "./NodeWatchBuild";
import Test from "./Test";
import Typescript from "./Typescript";
import Build from "./Build";
import WatchBuild from "./WatchBuild";
import Scaffolding from "./Scaffolding";
const gulp = require("gulp");

export const frontend = {
    "clean": Clean,
    "build": gulp.series(Clean, Build),
    "watch-build": WatchBuild,
    "test": Test,
    "new": Scaffolding
};

export const module = {
    "clean": Clean,
    "build": Typescript,
    "test": Test,
    "new": Scaffolding
};

export const nodejs = {
    "clean": Clean,
    "build": Typescript,
    "watch-build": NodeWatchBuild,
    "test": Test,
    "new": Scaffolding
};
