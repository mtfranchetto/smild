interface ITaskRunner {
    run(task:string):Promise<void>;
}

export default ITaskRunner