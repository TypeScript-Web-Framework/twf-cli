let fs = require("fs");
let path = require("path");
let crypto = require('crypto');
let c = require("ansi-colors");

export class CheckAction {

    public static args : string [] = [];
    public static directory : string;
    public static files : Array<{
        name : string,
        type : "file" | "dir" | "symbolic",
        cheksum?: string
    }> = [
        {name : "src", type : "dir"},
        {name : "package.json", type : "file"},
        {name : "gulpfile.js", type : "file"},
        {name : "tsconfig.json", type : "file"}
    ];


    public constructor (args: string[]) {
        CheckAction.directory = process.cwd();
        CheckAction.args = args;
        console.group("Check");
        if (!this.isValid()) {
            console.log("This project is not valid");
            console.log("Exit with code 1");
            process.exit(1);
        }
        else {
            console.log("This project is valid");
            process.exit(0);
        }
        console.groupEnd()

    }

    public isValid ():boolean {
        for (let file of CheckAction.files) {
            let filePath: string = CheckAction.directory + path.sep + file.name;

            console.log(
                c.bold.blue(
                    "Checking ",
                    c.italic.black(file.type),
                    c.gray(":"),
                    c.underline.cyan(filePath)
                )
            );
            if (!this.exists(filePath)) {
                console.log(c.bold.red("File don't exists"));
                process.exit(1);
            }
            else {
                if (file.type === "dir" && !this.isDir(filePath)) return false;
                if (file.type === "file" && !this.isFile(filePath)) return false;
                if (file.type === "symbolic" && !this.isSymbolicLink(filePath)) return false;
                if (typeof file.cheksum === "string") {
                    if (this.checksum(filePath) !== file.cheksum) {
                        return false;
                    }
                }
            }


        }
        return true;
    }


    public checksum (filePath : string):string {
        return crypto
            .createHash("sha1")
            .update(fs.readFileSync(filePath, "utf8"), 'utf8')
            .digest('hex')
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
