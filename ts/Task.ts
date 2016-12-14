import {IBuildHelper} from "./BuildHelper";
import ITaskRunner from "./ITaskRunner";

interface Task {
    (helper:IBuildHelper, taskRunner?:ITaskRunner);
}

export default Task