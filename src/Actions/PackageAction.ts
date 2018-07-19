import {ChildProcess, spawn} from "child_process";
let path = require("path");
let c = require("ansi-colors");
let fs = require("fs");
export class PackageAction {
    public static npm:string;
    public static directory:string;
    public static isWin:boolean;

    constructor () {
        PackageAction.directory = process.cwd();
        PackageAction.isWin = /^win/i.test(process.platform);
        PackageAction.npm  = PackageAction.isWin ? "npm.cmd" : "npm";


        this.build().then(() =>
            this.package()
                .then(c => process.exit(c))
                .catch((c) => process.exit(c))
        );
    }

    package ():Promise<number> {

        return new Promise<number>((resolve, reject) => {
            console.log(c.bold.green(c.symbols.check, "Packing project"));
            let cmd = spawn(PackageAction.npm, ["run", "pkg"]);
            cmd.stdout.on('data', d => {
                //console.log(d.toString())
            });
            cmd.stderr.on('data', d => {
                //console.log(d.toString())
            });
            cmd.on('exit', n => {
                if (n === 0) {
                    console.log(c.bold.green(c.symbols.check, "Packing Success:", c.gray([
                        PackageAction.directory,
                        "bin",
                        PackageAction.packageJson().name
                    ].join(path.sep) + (PackageAction.isWin? ".exe" : ""))));
                }
                resolve(n)
            });
        })
    }

    build ():Promise<boolean> {
        return new Promise((resolve) => {
            console.log(c.bold.green(c.symbols.check, "compiling project"));

            let cmd : ChildProcess = spawn(PackageAction.npm, ["run", "build"]);
            cmd.stdout.on('data', d => {
                //console.log(d)
            });
            cmd.stderr.on('data', d => {
                //console.log(d)
            });
            cmd.on('exit', n => {
                console.log(c.bold.green(c.symbols.check, "compilation is ending"));
                resolve(n === 0)
            });
        })
    }

    static packageJson () {
        return JSON.parse(
            fs.readFileSync([
                process.cwd(),
                path.sep,
                "package.json"
            ].join(path.sep))
        );
    }
}
