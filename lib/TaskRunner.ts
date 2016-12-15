const gulp = require("gulp");
import * as chalk from "chalk";

class TaskRunner {

    run(task: Function, description?:string): Promise<void> {
        let start = +new Date();
        if (description)
            console.log('Starting', chalk.yellow(description));
        return new Promise((resolve, reject) => {
            gulp.parallel(task)(error => {
                if (error) return reject(error);
                if (description)
                    console.log(
                        'Finished', chalk.yellow(description),
                        'after', chalk.yellow(((+new Date() - start) / 1000).toFixed(1) + 's')
                    );
                resolve();
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

export default TaskRunner