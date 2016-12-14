import {IBuildHelper} from "../BuildHelper";
import * as del from "del";

export default (helper: IBuildHelper) => del([helper.getDistFolder(), helper.getTempFolder()], {force: true});