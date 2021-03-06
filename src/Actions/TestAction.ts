import {ChildProcess, spawn} from "child_process";
import {BuildAction} from "./BuildAction";
let path = require("path");
let c = require("ansi-colors");
let fs = require("fs");
export class TestAction {
    public static npm:string;
    public static directory:string;
    public static isWin:boolean;

    constructor () {
        TestAction.directory = process.cwd();
        TestAction.isWin = /^win/i.test(process.platform);
        TestAction.npm  = TestAction.isWin ? "npm.cmd" : "npm";
        BuildAction.build(TestAction.directory)
            .then(c =>
            this.test()
                .then(n => process.exit(n))
                .catch(n => process.exit(1)))
            .catch((c) => process.exit(c))
    }

    test ():Promise<number> {
        return new Promise((resolve) => {
            console.log(c.bold.green(c.symbols.check, "testing project"));

            let cmd : ChildProcess = spawn(TestAction.npm, ["run", "test"]);
            cmd.stdout.on('data', d => {
                console.log(d.toString())
            });
            cmd.stderr.on('data', d => {
                console.log(d.toString())
            });
            cmd.on('exit', n => {
                console.log(c.bold.green(c.symbols.check, "testing is ending"));
                resolve(n)
            });
        })
    }
}
