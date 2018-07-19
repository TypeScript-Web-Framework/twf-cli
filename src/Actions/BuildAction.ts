import {ChildProcess, spawn} from "child_process";
let path = require("path");
let c = require("ansi-colors");
let fs = require("fs");
export class BuildAction {
    public static npm:string;
    public static directory:string;
    public static isWin:boolean;

    constructor () {
        BuildAction.directory = process.cwd();
        BuildAction.isWin = /^win/i.test(process.platform);
        BuildAction.npm  = BuildAction.isWin ? "npm.cmd" : "npm";
        this.build()
            .then(c => process.exit(c))
            .catch((c) => process.exit(c))
    }

    build ():Promise<number> {
        return new Promise((resolve) => {
            console.log(c.bold.green(c.symbols.check, "compiling project"));

            let cmd : ChildProcess = spawn(BuildAction.npm, ["run", "build"]);
            cmd.stdout.on('data', d => {
                //console.log(d)
            });
            cmd.stderr.on('data', d => {
                //console.log(d)
            });
            cmd.on('exit', n => {
                console.log(c.bold.green(c.symbols.check, "compilation is ending"));
                resolve(n)
            });
        })
    }
}
