import ISettingsParser from "./settings/ISettingsParser";
const gulp = require("gulp");
import * as fs from "fs";
import * as path from "path";

export interface IBuildHelper {
    getSettings(): any;
    getDistFolder(): string;
    getTempFolder(): string;
    isRelease(): boolean;
    isWatching(): boolean;
    getCurrentTarget(): string;
    setTarget(target: string);
    getTargets(): string[];
    enableWatch();
    enableRelease();
}

export class BuildHelper implements IBuildHelper {
    private target: string = null;
    private release = false;
    private watching = false;
    private settings = null;

    constructor(settingsParser: ISettingsParser) {
        this.settings = settingsParser.parse();
    }

    getSettings(): any {
        return this.settings;
    }

    getDistFolder(): string {
        return this.addTargetToDirectory(this.settings.distribution);
    }

    getTempFolder(): string {
        //When running debug use always the dist folder (because revisioning is disabled)
        return this.addTargetToDirectory(this.isRelease() ? "tmp" : this.settings.distribution);
    }

    private addTargetToDirectory(directory) {
        return path.resolve(directory, this.target + '/');
    }

    isRelease(): boolean {
        return this.release;
    }

    isWatching(): boolean {
        return this.watching;
    }

    getCurrentTarget(): string {
        return this.target;
    }

    setTarget(target: string) {
        this.target = target;
        process.env.TARGET = target;
        process.env.NODE_ENV = this.isRelease() ? "production" : "development";
        process.env.CWD = process.env.cwd();
        process.env.PACKAGE_VERSION = this.settings.projectPackage.version;
    }

    getTargets(): string[] {
        let rootDir = path.resolve(process.env.cwd(), this.settings.targets),
            files = fs.readdirSync(rootDir),
            directories = [];
        _.forEach(files, function (file) {
            if (file[0] != '.') {
                var filePath = rootDir + '/' + file,
                    stat = fs.statSync(filePath);
                if (stat.isDirectory())
                    directories.push(file);
            }
        });
        
        return directories;
    }

    enableWatch() {
        this.watching = true;
    }

    enableRelease() {
        this.release = true;
    }

    getTasksList() {
        return gulp.tree().nodes;
    }
}
