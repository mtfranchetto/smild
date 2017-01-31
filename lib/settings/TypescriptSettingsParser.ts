import ISettingsParser from "./ISettingsParser";
import * as path from "path";
import * as fs from "fs";

class TypescriptSettingsParser implements ISettingsParser {

    parse(): any {
        try {
            return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf8'));
        } catch (error) {
            console.log("Error while reading tsconfig.json");
            console.error(error);
            return {};
        }
    }

}

export default TypescriptSettingsParser