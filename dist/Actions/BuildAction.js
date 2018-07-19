"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
let path = require("path");
let c = require("ansi-colors");
let fs = require("fs");
class BuildAction {
    constructor() {
        BuildAction.directory = process.cwd();
        BuildAction.isWin = /^win/i.test(process.platform);
        BuildAction.npm = BuildAction.isWin ? "npm.cmd" : "npm";
        this.build()
            .then(c => process.exit(c))
            .catch((c) => process.exit(c));
    }
    build() {
        return new Promise((resolve) => {
            console.log(c.bold.green(c.symbols.check, "compiling project"));
            let cmd = child_process_1.spawn(BuildAction.npm, ["run", "build"]);
            cmd.stdout.on('data', d => {
            });
            cmd.stderr.on('data', d => {
            });
            cmd.on('exit', n => {
                console.log(c.bold.green(c.symbols.check, "compilation is ending"));
                resolve(n);
            });
        });
    }
}
exports.BuildAction = BuildAction;
