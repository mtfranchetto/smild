import Clean from "./Clean";
import NodeWatchBuild from "./NodeWatchBuild";
import Test from "./Test";
import Typescript from "./Typescript";
import Build from "./Build";
import FrontendWatchBuild from "./FrontendWatchBuild";
import Scaffolding from "./Scaffolding";
import Coverage from "./Coverage";
import ModuleWatchBuild from "./ModuleWatchBuild";
import Assets from "./Assets";
import Browserify from "./Browserify";
import CopyIndex from "./CopyIndex";
import {PreBuild, PostBuild} from "./Hooks";
import Images from "./Images";
import Revision from "./Revision";
import Serve from "./Serve";
import Styles from "./Styles";

export const all = [
    Assets,
    Browserify,
    Build,
    Clean,
    CopyIndex,
    Coverage,
    FrontendWatchBuild,
    PreBuild,
    PostBuild,
    Images,
    ModuleWatchBuild,
    NodeWatchBuild,
    Revision,
    Scaffolding,
    Serve,
    Styles,
    Test,
    Typescript
];