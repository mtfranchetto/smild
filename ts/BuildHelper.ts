export interface IBuildHelper {
    getOptions():any;
    getDistFolder():string;
    getTempFolder():string;
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
