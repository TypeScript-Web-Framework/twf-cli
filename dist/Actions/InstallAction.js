"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const Helpers_1 = require("../Helpers");
let c = require("ansi-colors");
class InstallAction {
    constructor() {
        this.npm = /^win/i.test(process.platform) ? "npm.cmd" : "npm";
        this.install().then((n) => {
        });
    }
    install() {
        return new Promise((resolve, reject) => {
            return new Promise((resolve, reject) => {
                console.log(c.bold.green(c.symbols.check, "instaling dependencies"));
                let loading = Helpers_1.Helpers.loading().start();
                let cmd = child_process_1.spawn(this.npm, ["install"]);
                cmd.stdout.on('data', d => {
                });
                cmd.stderr.on('data', d => {
                    process.stdout.write("\r" + "");
                    console.log(d.toString());
                    process.stdout.write("\r" + "");
                });
                cmd.on('exit', n => {
                    loading.end();
                    console.log(c.bold.green(c.symbols.check, "dependencies installed correctly"));
                    resolve(n);
                });
            });
        });
    }
}
exports.InstallAction = InstallAction;
