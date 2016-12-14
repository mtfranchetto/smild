export interface IBuildHelper {
    getSettings():any;
    getDistFolder():string;
    getTempFolder():string;
    isRelease():boolean;
    isWatching():boolean;
    getCurrentTarget():string;
    setTarget(target:string);
    getTargets():string[];
    enableWatch();
}

export class BuildHelper implements IBuildHelper {

    getOptions(): any {
        return undefined;
    }

    getDistFolder(): string {
        return undefined;
    }

    getTempFolder(): string {
        return undefined;
    }

}
