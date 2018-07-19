"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
let path = require("path");
let c = require("ansi-colors");
let fs = require("fs");
class PackageAction {
    constructor() {
        PackageAction.directory = process.cwd();
        PackageAction.isWin = /^win/i.test(process.platform);
        PackageAction.npm = PackageAction.isWin ? "npm.cmd" : "npm";
        this.build().then(() => this.package()
            .then(c => process.exit(c))
            .catch((c) => process.exit(c)));
    }
    package() {
        return new Promise((resolve, reject) => {
            console.log(c.bold.green(c.symbols.check, "Packing project"));
            let cmd = child_process_1.spawn(PackageAction.npm, ["run", "pkg"]);
            cmd.stdout.on('data', d => {
            });
            cmd.stderr.on('data', d => {
            });
            cmd.on('exit', n => {
                if (n === 0) {
                    console.log(c.bold.green(c.symbols.check, "Packing Success:", c.gray([
                        PackageAction.directory,
                        "bin",
                        PackageAction.packageJson().name
                    ].join(path.sep) + (PackageAction.isWin ? ".exe" : ""))));
                }
                resolve(n);
            });
        });
    }
    build() {
        return new Promise((resolve) => {
            console.log(c.bold.green(c.symbols.check, "compiling project"));
            let cmd = child_process_1.spawn(PackageAction.npm, ["run", "build"]);
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
    static packageJson() {
        return JSON.parse(fs.readFileSync([
            process.cwd(),
            path.sep,
            "package.json"
        ].join(path.sep)));
    }
}
exports.PackageAction = PackageAction;
