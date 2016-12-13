import ISettingsParser from "./ISettingsParser";
import * as path from "path";
import * as fs from "fs";

class TypescriptSettingsParser implements ISettingsParser {

    parse(): any {
        try {
            return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf8'));
        } catch (error) {
            return JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'tsconfig.json'), 'utf8'));
        }
    }

}

export default TypescriptSettingsParser