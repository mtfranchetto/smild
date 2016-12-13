import IBuildHelper from "./IBuildHelper";

class BuildHelper implements IBuildHelper {

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

export default BuildHelper