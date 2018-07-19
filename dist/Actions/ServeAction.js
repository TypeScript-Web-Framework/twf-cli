"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
let path = require("path");
let c = require("ansi-colors");
class ServeAction {
    constructor() {
        this.npm = /^win/i.test(process.platform) ? "npm.cmd" : "npm";
        this.build().then(() => this.serve()
            .then(c => process.exit(c))
            .catch((c) => process.exit(c)));
    }
    serve() {
        let serve = [
            process.cwd(),
            "www",
            "server.js"
        ].join(path.sep);
        return new Promise((resolve, reject) => {
            console.log(c.bold.green(c.symbols.check, "starting project"));
            let cmd = child_process_1.spawn("node", [serve]);
            cmd.stdout.on('data', d => console.log(d.toString()));
            cmd.stderr.on('data', d => console.log(d.toString()));
            cmd.on('exit', c => resolve(c));
        });
    }
    build() {
        return new Promise((resolve, reject) => {
            console.log(c.bold.green(c.symbols.check, "compiling project"));
            let cmd = child_process_1.spawn(this.npm, ["run", "build"]);
            cmd.stdout.on('data', d => {
            });
            cmd.stderr.on('data', d => {
            });
            cmd.on('exit', n => {
                console.log(c.bold.green(c.symbols.check, "compilation is ending"));
                resolve(n === 0);
            });
        });
    }
}
exports.ServeAction = ServeAction;
