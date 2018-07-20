import {Helpers} from "../Helpers";
import {spawnSync, SpawnSyncReturns} from "child_process";
import {InstallAction} from "./InstallAction";
import {InfoAction} from "./InfoAction";

let path = require("path");
let fs = require("fs");
let crypto = require('crypto');
let uuid = require('uuid/v4');
let c :any = require('ansi-colors');


export class StartAction {
    readonly REGEX_DIRECTORY : RegExp = /^([.\/\\\s]+)$/;
    public static directory : string;
    public static argv : string [] = [];

    public constructor (argv:string[]) {
        StartAction.argv = argv;
        this.onInit.apply(this, argv);
    }


    public onInit (...args:string[]) {
        StartAction.directory = process.cwd();
        // check if project name is set
        // if the project name is not set, so assumes need take the current working directory as root
        if (args.length > 0 && typeof args[0] === "string") {
            if (!this.REGEX_DIRECTORY.test(args[0])) StartAction.directory += path.sep + Helpers.camelize(args[0]);
        }
        else {
            console.warn([
                c.bold.yellow(c.symbols.warning),
                c.bold.yellow("The root of the project has not been set. The current folder will be taken.")
            ].join(" "))
        }
        console.log([
            c.bold.green(c.symbols.check, "Working on "),
            c.bold.magenta(StartAction.directory)
        ].join(" "));

        Helpers.fileExists(StartAction.directory)
            .then(exists => {
                // check last release version
                let promises = [InfoAction.getLatestReleaseFromGitHub("typescript-web-framework", "ts-web-framework")];
                // check if folder is empty
                if (exists) promises.push(this.isEmptyDir(StartAction.directory));
                // await promises
                Promise.all(promises)
                    .then((itm:any[]) => {
                        if (itm.length === 1 || (itm.length === 2 && itm[1] === true)) {
                            this.download(itm[0].tag_name)
                            // end
                                .then(() => {
                                    console.log([
                                        c.bold.green(c.symbols.check, "Project creation finished and store on"),
                                        c.bold.magenta(StartAction.directory)
                                    ].join(" "));
                                    process.exit(0);
                                })
                                // end with problems
                                .catch((e) => StartAction.error(e))
                        }
                        if (itm.length === 2 && itm[1] === false) {
                            console.error(c.bold.red(c.symbols.cross, "Working directory is not empty"));
                            process.exit(1);
                        }
                    })
                    .catch(e => StartAction.error(e));
            })
            .catch(e => StartAction.error(e));
    }

    private static error (e:any):void {
        console.log(c.bold.red("There's been a problem:"), e);
        process.exit(1);
    }

    public download (version:string):Promise<void> {
        return new Promise((resolve, reject) => {
            Promise
                .all([
                    this.clone(version),
                    this.editConfig(),
                    InstallAction.install(StartAction.directory)
                ])
                .then(() => resolve())
                .catch(e => reject(e))
        })
    }

    public clone (tag:string):Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(c.bold.green(c.symbols.check, "download", tag));
            let spawn : SpawnSyncReturns<string> = spawnSync("git", [
                "clone",
                "https://github.com/typescript-web-framework/ts-web-framework.git",
                "--branch",
                tag,
                "--single-branch",
                "--depth",
                "1",
                StartAction.directory
            ]);
            if (!spawn.error) {
                console.log(c.bold.green(c.symbols.check, "downloaded", tag));
                resolve();
            }
            else reject(spawn.error);
        })
    }

    public editConfig ():Promise<void> {
        return new Promise<void>((resolve) => {
            let paths : any = {
                manifiest : StartAction.directory + path.sep + "src" + path.sep + "manifiest.json",
                package : StartAction.directory + path.sep + "package.json"
            };
            let content : any;
            content = JSON.parse(fs.readFileSync(paths.manifiest));
            content.salt = crypto.createHash('sha1')
                .update(uuid())
                .digest("hex");
            content = JSON.stringify(content, null, 4);
            fs.writeFile(paths.manifiest, content, (e:any) => {
                if (e) throw new Error(e);
                else resolve();
            });
        })
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
