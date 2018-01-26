import ISettingsParser from "./ISettingsParser";
import DefaultSettings from "./DefaultSettings";
import * as _ from "lodash";
import * as path from "path";

class SmildSettingsParser implements ISettingsParser {

    parse(): any {
        let smildFile = null,
            packageJson = {};
        try {
            packageJson = require(path.join(process.cwd(), 'package.json'));
        } catch (error) {
        }
        try {
            smildFile = require(path.join(process.cwd(), 'smildfile.js'));
        } catch (error) {
            smildFile = packageJson.smild ? packageJson.smild : {};
        }
        return _.assign(DefaultSettings, smildFile, {
            projectPackage: packageJson
        });
    }

}

export default SmildSettingsParser
