import {ChildProcess, spawn} from 'child_process'
let path = require("path");
let c = require("ansi-colors");
export class ServeAction {
    readonly npm :string = /^win/i.test(process.platform)? "npm.cmd" : "npm";

    constructor () {

        this.build().then(() =>
            this.serve()
                .then(c => process.exit(c))
                .catch((c) => process.exit(c))
        );
    }

    serve ():Promise<number> {

        let serve : string = [
            process.cwd(),
            "www",
            "server.js"
        ].join(path.sep);

        return new Promise<number>((resolve, reject) => {
            console.log(c.bold.green(c.symbols.check, "starting project"));
            let cmd = spawn("node", [serve]);
            cmd.stdout.on('data', d => console.log(d.toString()));
            cmd.stderr.on('data', d => console.log(d.toString()));
            cmd.on('exit', c => resolve(c));
        })
    }

    build ():Promise<boolean> {
        return new Promise((resolve, reject) => {
            console.log(c.bold.green(c.symbols.check, "compiling project"));

            let cmd : ChildProcess = spawn(this.npm, ["run", "build"]);
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
}
