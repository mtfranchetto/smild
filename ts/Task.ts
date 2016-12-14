import {IBuildHelper} from "./BuildHelper";
import {ITaskRunner} from "./TaskRunner";

interface Task {
    (helper:IBuildHelper, taskRunner?:ITaskRunner);
}

export default Task