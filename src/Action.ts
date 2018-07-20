export interface IAction {
    prepare : ()=> void;
}

export class Action {
    public static directory : string =  process.cwd();
    public static argv : string[] = [];
    constructor (...argv:string[]) {
        Action.argv = argv;
        Action.directory = process.cwd();

        if (!('prepare' in this) || typeof (<any>this).prepare !== "function") {
            throw new Error(`Action require "prepare" property`);
        }
    }
}
