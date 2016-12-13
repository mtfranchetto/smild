import ISettingsParser from "./ISettingsParser";
const fs = require("fs");
const path = require("path");

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