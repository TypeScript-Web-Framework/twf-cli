import {spawn} from "child_process";
import {Helpers} from "../Helpers";
let c = require("ansi-colors");

export class InstallAction {

    readonly npm :string = /^win/i.test(process.platform)? "npm.cmd" : "npm";


    constructor () {
        this.install().then((n) => {
        });
    }



    install () {
        return new Promise((resolve, reject) => {
            return new Promise<number>((resolve, reject) => {
                console.log(c.bold.green(c.symbols.check, "instaling dependencies"));
                let loading = Helpers.loading().start();

                let cmd = spawn(this.npm, ["install"]);
                cmd.stdout.on('data', d => {
                    //console.log(d.toString())
                });
                cmd.stderr.on('data', d => {
                    process.stdout.write("\r" + "");
                    console.log(d.toString());
                    process.stdout.write("\r" + "");
                });
                cmd.on('exit', n => {
                    loading.end();
                    console.log(c.bold.green(c.symbols.check, "dependencies installed correctly"));
                    resolve(n)
                });
            })

        })

    }



}
