import {Helpers} from "../Helpers";
import {spawnSync, SpawnSyncReturns} from "child_process";

let path = require("path");
let fs = require("fs");
let https = require("https");
let crypto = require('crypto');
let uuid = require('uuid/v4');


export class StartAction {
    public static directory : string;
    public static argv : string [] = [];

    public constructor (argv:string[]) {
        StartAction.argv = argv;
        this.onInit.apply(this, argv);
    }


    public onInit (...args:string[]) {
        StartAction.directory = process.cwd();

        if (args.length > 0) {
            if(typeof args[0] === "string") {
                if (!/^([.\/\\\s]+)$/.test(args[0])) StartAction.directory += path.sep + Helpers.camelize(args[0]);
            }
            else throw new TypeError("expected string name");
        }
        console.log(`Working on ${StartAction.directory}`);



        if (!fs.existsSync(StartAction.directory)) {
            this.isEmptyDir(StartAction.directory)
                .then(() => this.getLastRelease()
                        .then((t) =>
                            this.clone(t)
                                .then(() =>
                                    this.editConfig()
                                        .then(() => this.installDependencies()
                                            .then(() => {})
                                            .catch(() => {

                                            }))
                                        .catch(() => {
                                        })
                                )
                                .catch())
                        .catch(() => {})
                )
                .catch((e) => {
                    throw new Error(`The directory ${StartAction.directory} is not empty`)
                })
        }
        else throw new Error(`Directory ${StartAction.directory} already exists`);
    }

    public getLastRelease ():Promise<string> {
        return new Promise<string>((resolve, reject) => {
            https.get({
                protocol : "https:",
                host : "api.github.com",
                hostname : "api.github.com",
                port : "443",
                method : "GET",
                path : "/repos/olaferlandsen/ts-web-framework/releases/latest",
                headers : {
                    "user-agent" : "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
                }
            }, (res:any) => {
                let data :any = '';
                res.on("data", (chunk:any) => data += chunk);
                res.on("end", () => {
                    try {
                        resolve(JSON.parse(data).tag_name);
                    }
                    catch (e) {
                        reject(e)
                    }
                });
                res.on("error", (e:any) => reject(e));
            })
        });
    }

    public clone (tag:string):Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`Cloning version ${tag}`);
            let spawn : SpawnSyncReturns<string> = spawnSync("git", [
                "clone",
                "https://github.com/olaferlandsen/ts-web-framework.git",
                "--branch",
                tag,
                "--single-branch",
                "--depth",
                "1",
                StartAction.directory
            ]);
            if (!spawn.error) resolve();
            else reject(spawn.error);
        })
    }

    public editConfig ():Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let paths : any = {
                manifiest : StartAction.directory + path.sep + "src" + path.sep + "manifiest.json",
                package : StartAction.directory + path.sep + "package.json"
            };
            let content : any;

            console.group("Config");
            console.log("editing manifiest.json");
            content = JSON.parse(fs.readFileSync(paths.manifiest));
            content.salt = crypto.createHash('sha1').update(uuid()).digest("hex");
            content = JSON.stringify(content, null, 4);
            fs.writeFile(paths.manifiest, content, (e:any) => {
                if (e) throw new Error(e);
            });

            /*
            console.log("editing package.json");
            content = JSON.parse(fs.readFileSync(paths.package));
            delete content.scripts["snyk-protect"];
            delete content.scripts["prepare"];
            delete content.snyk;
            delete content.dependencies.snyk;
            content = JSON.stringify(content, null, 4) + "\n";
            fs.writeFile(paths.package, content, (e:any) => {
                if (e) throw new Error(e);
                else {
                    console.log("end...... editing package.sjon")
                }
            });
            */
            console.log("end editing...");
            console.groupEnd();
            resolve();

        })
    }

    public installDependencies ():Promise<void> {
        return new Promise((resolve, reject) => {
            /*

            console.group("Installing dependencies");
            process.chdir( StartAction.directory );
            console.log("Working on", process.cwd());



            let cmd : SpawnSyncReturns<string> = spawnSync(/^win/i.test(process.platform)? "npm.cmd" : "npm", ["install"]);
            console.log("stderr", cmd["stderr"].toString());
            console.log("stdout", cmd["stdout"].toString());
            console.log("status", cmd["status"].toString());
            console.groupEnd();


            if (!cmd.error) resolve();
            else reject(cmd.error);
            */
            console.log("please install dependencies:\nnpm install")
            resolve();
        });
    }

    private isEmptyDir (directory : string):Promise<boolean> {
        return new Promise((resolve, reject) =>
            fs.readdir(directory, (e:any, f:any) => {
                if (e) {
                    if (!fs.existsSync(directory)) resolve(true);
                    else reject();
                }
                else resolve(!f.length)
            }))
    }
}
