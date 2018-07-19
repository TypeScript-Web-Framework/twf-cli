"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("../Helpers");
const child_process_1 = require("child_process");
let path = require("path");
let fs = require("fs");
let https = require("https");
let crypto = require('crypto');
let uuid = require('uuid/v4');
class StartAction {
    constructor(argv) {
        StartAction.argv = argv;
        this.onInit.apply(this, argv);
    }
    onInit(...args) {
        StartAction.directory = process.cwd();
        if (args.length > 0) {
            if (typeof args[0] === "string") {
                if (!/^([.\/\\\s]+)$/.test(args[0]))
                    StartAction.directory += path.sep + Helpers_1.Helpers.camelize(args[0]);
            }
            else
                throw new TypeError("expected string name");
        }
        console.log(`Working on ${StartAction.directory}`);
        if (!fs.existsSync(StartAction.directory)) {
            this.isEmptyDir(StartAction.directory)
                .then(() => this.getLastRelease()
                .then((t) => this.clone(t)
                .then(() => this.editConfig()
                .then(() => this.installDependencies()
                .then(() => { })
                .catch(() => {
            }))
                .catch(() => {
            }))
                .catch())
                .catch(() => { }))
                .catch((e) => {
                throw new Error(`The directory ${StartAction.directory} is not empty`);
            });
        }
        else
            throw new Error(`Directory ${StartAction.directory} already exists`);
    }
    getLastRelease() {
        return new Promise((resolve, reject) => {
            https.get({
                protocol: "https:",
                host: "api.github.com",
                hostname: "api.github.com",
                port: "443",
                method: "GET",
                path: "/repos/olaferlandsen/ts-web-framework/releases/latest",
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
                }
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
        });
    }
    clone(tag) {
        return new Promise((resolve, reject) => {
            console.log(`Cloning version ${tag}`);
            let spawn = child_process_1.spawnSync("git", [
                "clone",
                "https://github.com/olaferlandsen/ts-web-framework.git",
                "--branch",
                tag,
                "--single-branch",
                "--depth",
                "1",
                StartAction.directory
            ]);
            if (!spawn.error)
                resolve();
            else
                reject(spawn.error);
        });
    }
    editConfig() {
        return new Promise((resolve, reject) => {
            let paths = {
                manifiest: StartAction.directory + path.sep + "src" + path.sep + "manifiest.json",
                package: StartAction.directory + path.sep + "package.json"
            };
            let content;
            console.group("Config");
            console.log("editing manifiest.json");
            content = JSON.parse(fs.readFileSync(paths.manifiest));
            content.salt = crypto.createHash('sha1').update(uuid()).digest("hex");
            content = JSON.stringify(content, null, 4);
            fs.writeFile(paths.manifiest, content, (e) => {
                if (e)
                    throw new Error(e);
            });
            console.log("end editing...");
            console.groupEnd();
            resolve();
        });
    }
    installDependencies() {
        return new Promise((resolve, reject) => {
            console.log("please install dependencies:\nnpm install");
            resolve();
        });
    }
    isEmptyDir(directory) {
        return new Promise((resolve, reject) => fs.readdir(directory, (e, f) => {
            if (e) {
                if (!fs.existsSync(directory))
                    resolve(true);
                else
                    reject();
            }
            else
                resolve(!f.length);
        }));
    }
}
StartAction.argv = [];
exports.StartAction = StartAction;
