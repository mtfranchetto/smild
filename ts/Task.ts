import {IBuildHelper} from "./BuildHelper";

interface Task {
    (helper:IBuildHelper);
}

export default Task