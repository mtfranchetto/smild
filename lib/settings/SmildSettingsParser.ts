import ISettingsParser from "./ISettingsParser";
import DefaultSettings from "./DefaultSettings";
import * as _ from "lodash";
import * as path from "path";
import * as fs from "fs";

class SmildSettingsParser implements ISettingsParser {

    parse(): any {
        const packageJson = require(path.resolve(process.cwd(), 'package.json')) as any;
        let smildFile = packageJson.smild ? packageJson.smild : {};

        const projectSmildFilePath = path.resolve(process.cwd(), 'smildfile.js');
        if(fs.existsSync(projectSmildFilePath)) {
            smildFile = require(projectSmildFilePath);
        }

        return _.assign(DefaultSettings, smildFile, {
            projectPackage: packageJson
        });
    }

}

export default SmildSettingsParser
