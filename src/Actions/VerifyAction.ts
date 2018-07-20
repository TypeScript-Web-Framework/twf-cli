let fs = require("fs");
let path = require("path");
let crypto = require('crypto');
let c = require("ansi-colors");

export class VerifyAction {

    public static args : string [] = [];
    public static directory : string;
    public static stats : any = {
        negative : 0
    };
    public static files : Array<{
        name : string,
        type : "file" | "dir" | "symbolic"
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
        if (!VerifyAction.isValid()) message = "This project is not valid:";
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

    static isValid ():boolean {
        for (let file of VerifyAction.files) {
            let filePath: string = VerifyAction.directory + path.sep + file.name;
            if (!VerifyAction.exists(filePath)) VerifyAction.stats.negative++;
            else {
                if (
                    (file.type === "dir" && !VerifyAction.isDir(filePath))
                    || (file.type === "file" && !VerifyAction.isFile(filePath))
                    || (file.type === "symbolic" && !VerifyAction.isSymbolicLink(filePath))
                ) VerifyAction.stats.negative++;
            }
        }
        return VerifyAction.stats.negative === 0;
    }


    static isDir (path :string):boolean {
        return fs.lstatSync(path).isDirectory()
    }
    static isFile (path : string):boolean {
        return fs.lstatSync(path).isFile()
    }
    static isSymbolicLink (path : string):boolean {
        return fs.lstatSync(path).isSymbolicLink()
    }
    static exists (path: string):boolean {
        return fs.existsSync(path);
    }

}
