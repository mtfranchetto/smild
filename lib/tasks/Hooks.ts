import {buildHelper as helper, taskRunner} from "../Container";

export function PreBuild() {
    return helper.getSettings().preBuild(helper);
}

export function PostBuild() {
    return helper.getSettings().postBuild(helper);
}

export function VoidHook() {
    return Promise.resolve();
}
