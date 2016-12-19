import Clean from "./Clean";
import NodeWatchBuild from "./NodeWatchBuild";
import Test from "./Test";
import Typescript from "./Typescript";
import Build from "./Build";
import WatchBuild from "./WatchBuild";
import Scaffolding from "./Scaffolding";
import Coverage from "./Coverage";
const gulp = require("gulp");

export const frontend = {
    "build": gulp.series(Clean, Build),
    "watch-build": WatchBuild,
    "test": Test,
    "coverage": Coverage,
    "new": Scaffolding
};

export const module = {
    "build": Typescript,
    "test": Test,
    "coverage": Coverage,
    "new": Scaffolding
};

export const nodejs = {
    "build": Typescript,
    "watch-build": NodeWatchBuild,
    "test": Test,
    "coverage": Coverage,
    "new": Scaffolding
};
