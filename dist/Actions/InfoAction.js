"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let https = require("https");
let path = require("path");
let fs = require("fs");
let c = require("ansi-colors");
let compareVersions = require("compare-versions");
const child_process_1 = require("child_process");
class InfoAction {
    constructor() {
        this.npm = /^win/i.test(process.platform) ? "npm.cmd" : "npm";
        let npmv = child_process_1.spawnSync(this.npm, ["-v"]).stdout.toString().replace(/\s+/, '');
        let printVersion = (name, current, latest, texts) => {
            if (!texts)
                texts = {
                    down: "outdated",
                    up: "updated"
                };
            if (!texts.up)
                texts.up = "updated";
            if (!texts.down)
                texts.down = "outdated";
            let text = texts.up;
            let fn = "greenBright";
            if (compareVersions(current, latest) === -1) {
                text = texts.down;
                fn = "redBright";
            }
            console.log(c.bold.gray(name, c.bold.green(current), c.bold("(", c.bold[fn](text), ")")));
        };
        Promise.all([
            InfoAction.getLastCliRelease(),
            InfoAction.getLastFrameworkRelease()
        ]).then((latest) => {
            printVersion("CLI Version     :", InfoAction.cliVersion(), latest[0] || "0", {
                up: c.symbols.check,
                down: c.symbols.cross
            });
            printVersion("Project Version :", InfoAction.projectVersion(), latest[1] || "0", {
                up: c.symbols.check,
                down: c.symbols.cross
            });
            printVersion("NPM Version     :", npmv, "4.0.0", {
                up: c.symbols.check,
                down: c.symbols.cross
            });
            printVersion("Node Version    :", process.version, "6.0.0", {
                up: c.symbols.check,
                down: c.symbols.cross
            });
        })
            .catch(() => console.error(c.bold.red("Error...")));
    }
    static getLastCliRelease() {
        return new Promise((resolve, reject) => {
            try {
                https.get({
                    protocol: "https:",
                    host: "api.github.com",
                    hostname: "api.github.com",
                    port: "443",
                    method: "GET",
                    path: "/repos/olaferlandsen/twf-cli/releases/latest",
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
                    },
                    timeout: 1000
                }, (res) => {
                    let data = '';
                    res.on("data", (chunk) => data += chunk);
                    res.on("end", () => {
                        try {
                            resolve(JSON.parse(data).tag_name);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    res.on("error", (e) => reject(e));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static getLastFrameworkRelease() {
        return new Promise((resolve, reject) => {
            try {
                https.get({
                    protocol: "https:",
                    host: "api.github.com",
                    hostname: "api.github.com",
                    port: "443",
                    method: "GET",
                    path: "/repos/olaferlandsen/ts-web-framework/releases/latest",
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
                    },
                    timeout: 1000
                }, (res) => {
                    let data = '';
                    res.on("data", (chunk) => data += chunk);
                    res.on("end", () => {
                        try {
                            resolve(JSON.parse(data).tag_name);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    res.on("error", (e) => reject(e));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static cliVersion() {
        return JSON.parse(fs.readFileSync([
            path.dirname(path.dirname(__dirname)),
            path.sep,
            "package.json"
        ].join(path.sep))).version;
    }
    static projectVersion() {
        return JSON.parse(fs.readFileSync([
            process.cwd(),
            path.sep,
            "package.json"
        ].join(path.sep))).version;
    }
}
exports.InfoAction = InfoAction;
