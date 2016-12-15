import SmildSettingsParser from "./settings/SmildSettingsParser";
import BuildHelper from "./BuildHelper";
import TaskRunner from "./TaskRunner";

export const settingsParser = new SmildSettingsParser();
export const buildHelper = new BuildHelper(settingsParser);
export const taskRunner = new TaskRunner();
