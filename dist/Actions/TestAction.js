"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
let path = require("path");
let c = require("ansi-colors");
let fs = require("fs");
class TestAction {
    constructor() {
        TestAction.directory = process.cwd();
        TestAction.isWin = /^win/i.test(process.platform);
        TestAction.npm = TestAction.isWin ? "npm.cmd" : "npm";
        this.build()
            .then(c => this.test()
            .then(n => process.exit(n))
            .catch(n => process.exit(1)))
            .catch((c) => process.exit(c));
    }
    build() {
        return new Promise((resolve) => {
            console.log(c.bold.green(c.symbols.check, "compiling project"));
            let cmd = child_process_1.spawn(TestAction.npm, ["run", "build"]);
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
    test() {
        return new Promise((resolve) => {
            console.log(c.bold.green(c.symbols.check, "testing project"));
            let cmd = child_process_1.spawn(TestAction.npm, ["run", "test"]);
            cmd.stdout.on('data', d => {
                console.log(d.toString());
            });
            cmd.stderr.on('data', d => {
                console.log(d.toString());
            });
            cmd.on('exit', n => {
                console.log(c.bold.green(c.symbols.check, "testing is ending"));
                resolve(n);
            });
        });
    }
}
exports.TestAction = TestAction;
