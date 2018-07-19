let path = require("path");
let fs = require("fs");
export class CleanAction {

    public static directory : string;
    public static args : string [] = [];

    constructor (...args:string[]) {
        CleanAction.args = args;
        CleanAction.directory = process.cwd();
        ["dist", "www", "node_modules", "temp", "package-lock.json"]
            .map((route:string) =>
                this.remove.apply(this, [
                    CleanAction.directory + path.sep + route
                ]))
    }


    private remove (dir_path : string):void {
        if (fs.existsSync(dir_path)) {
            fs.readdirSync(dir_path).forEach((entry:any) => {
                let entry_path = path.join(dir_path, entry);
                if (fs.lstatSync(entry_path).isDirectory()) this.remove(entry_path);
                else fs.unlinkSync(entry_path);
            });
            fs.rmdirSync(dir_path);
        }
    }


}
