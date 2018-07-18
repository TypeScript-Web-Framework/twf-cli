let fs = require("fs");

export class CheckAction {

    public static args : string [] = [];
    public static directory : string;
    public constructor (args: string[]) {
        CheckAction.directory = process.cwd();
        CheckAction.args = args;
    }

    public isDir (path :string):boolean {
        return fs.lstatSync(path).isDirectory()
    }
    public isFile (path : string):boolean {
        return fs.lstatSync(path).isFile()
    }
    public isSymbolicLink (path : string):boolean {
        return fs.lstatSync(path).isSymbolicLink()
    }
    public exists (path: string):boolean {
        return fs.existsSync(path);
    }

}
