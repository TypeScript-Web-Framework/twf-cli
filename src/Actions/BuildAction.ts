import {ChildProcess, spawn} from "child_process";
let path = require("path");
let c = require("ansi-colors");
let fs = require("fs");
export class BuildAction {
    public static npm:string = /^win/i.test(process.platform) ? "npm.cmd" : "npm";
    public static directory:string = process.cwd();

    constructor () {
        BuildAction.build()
            .then(c => process.exit(c))
            .catch(c => process.exit(c))
    }

    static build (root?:string):Promise<number> {
        if(typeof root == "string") process.chdir(root);
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
