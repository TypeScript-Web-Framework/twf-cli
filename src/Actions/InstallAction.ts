import {spawn} from "child_process";
import {Helpers} from "../Helpers";
let c = require("ansi-colors");

export class InstallAction {

    static npm :string = /^win/i.test(process.platform)? "npm.cmd" : "npm";


    constructor () {
        InstallAction.install().then(() => {});
    }



    static async install (root?:string) {
        if (typeof root === "string") process.chdir(root);
        return new Promise((resolve, reject) => {
            console.log(c.bold.green(c.symbols.check, "instaling dependencies"));
            let loading = Helpers.loading().start();
            let cmd = spawn(InstallAction.npm, ["install"]);
            cmd.stderr.on('data', d => {
                process.stdout.write("\r" + "");
                console.log(d.toString());
                process.stdout.write("\r" + "");
            });
            cmd.on('exit', n => {
                loading.end();
                if (n === 0) {
                    console.log([
                        c.bold.green(c.symbols.check),
                        c.bold.green("dependencies installed correctly")
                    ].join(" "));
                    resolve(n)
                }
                else {
                    console.log([
                        c.bold.red(c.symbols.cross),
                        c.bold.red("Some problems have occurred installing the dependencies")
                    ].join(" "));
                    reject(n);
                }
            });
        })
    }
}
