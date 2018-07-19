let fs = require("fs");
let path = require("path");
let crypto = require('crypto');
let c = require("ansi-colors");

export class VerifyAction {

    public static args : string [] = [];
    public static directory : string;
    public static stats : any = {
        positive : 0,
        negative : 0,
        exists : 0,
        dontExists : 0
    };
    public static files : Array<{
        name : string,
        type : "file" | "dir" | "symbolic",
        cheksum?: string
    }> = [

        {name : "package.json", type : "file"},
        {name : "gulpfile.js", type : "file"},
        {name : "tsconfig.json", type : "file"},

        {name : "src", type : "dir"},
        {name : "src/manifiest.json", type : "file"},
        {name : "src/typings.d.ts", type : "file"},
        {name : "src/server.ts", type : "file"},
        {name : "src/app.ts", type : "file"},

        {name : "src/core", type : "dir"},
        {name : "src/core/Annotations.ts", type : "file"},
        {name : "src/core/Controller.ts", type : "file"},
        {name : "src/core/Exception.ts", type : "file"},
        {name : "src/core/Manifiest.ts", type : "file"},
        {name : "src/core/Middleware.ts", type : "file"},
        {name : "src/core/MiddlewareInject.ts", type : "file"},


        {name : "src/annotations", type : "dir"},
        {name : "src/annotations/Api.ts", type : "file"},
        {name : "src/annotations/Http.ts", type : "file"},
    ];


    public constructor (args: string[]) {
        VerifyAction.directory = process.cwd();
        VerifyAction.args = args;
        let message : string;
        if (!this.isValid()) message = "This project is not valid:";
        else message = "This project is valid:";
        console.log(
            c.bold.gray(
                VerifyAction.stats.negative > 0 ? c.symbols.cross : c.symbols.check,
                message,
                c.bold.green(VerifyAction.files.length),
                "files checked",
                c.bold.red(VerifyAction.stats.negative),
                "problems"
            )
        );
        process.exit(VerifyAction.stats.negative === 0 ? 0 : 1);
    }

    public isValid ():boolean {

        for (let file of VerifyAction.files) {
            let filePath: string = VerifyAction.directory + path.sep + file.name;
            if (!this.exists(filePath)) {
                VerifyAction.stats.negative++;
                VerifyAction.stats.dontExists++;
            }
            else {
                VerifyAction.stats.exists++;
                if (file.type === "dir" && !this.isDir(filePath)) {
                    VerifyAction.stats.negative++;
                }
                if (file.type === "file" && !this.isFile(filePath)) {
                    VerifyAction.stats.negative++;
                }
                if (file.type === "symbolic" && !this.isSymbolicLink(filePath)) {
                    VerifyAction.stats.negative++;
                }
                if (typeof file.cheksum === "string") {
                    if (this.checksum(filePath) !== file.cheksum) {
                        VerifyAction.stats.negative++;
                    }
                }
            }
        }
        return VerifyAction.stats.negative === 0;
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
