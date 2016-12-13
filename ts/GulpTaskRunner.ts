import ITaskRunner from "./ITaskRunner";
const gulp = require("gulp");

class GulpTaskRunner implements ITaskRunner {

    run(task: string): Promise<void> {
        return new Promise((resolve, reject) => {
            gulp.parallel(task)(function (error) {
                if (error) reject(error);
                else resolve();
            });
        }).catch(error => this.exit(1));
    }

    protected exit(code: number) {
        // Fix stdout truncation on windows
        if (process.platform === 'win32' && (<any>process.stdout).bufferSize) {
            process.stdout.once('drain', function () {
                process.exit(code);
            });
            return;
        }
        process.exit(code);
    }

}

export default GulpTaskRunner