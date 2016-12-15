import {buildHelper as helper, taskRunner} from "../Container";
import * as del from "del";

export default function Clean() {
    return del([helper.getDistFolder(), helper.getTempFolder()], {force: true});
}