const gulp = require("gulp");

class TaskRunner {

    run(task: string|Function): Promise<void> {
        return new Promise((resolve, reject) => {
            gulp.parallel(task)(error => {
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

export default TaskRunner