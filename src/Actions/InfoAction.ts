let https = require("https");
let path = require("path");
let fs = require("fs");
let c = require("ansi-colors");
let compareVersions = require("compare-versions");
import {ChildProcess, spawn} from "child_process";

export class InfoAction {
    // define npm to usin: windows linux or mac
    public static npm :string = /^win/i.test(process.platform)? "npm.cmd" : "npm";
    // start
    constructor () {
        this.run();
    }
    // Execute all promises
    public run () {
        Promise.all([
            InfoAction.readJsonFile([path.dirname(path.dirname(__dirname)),"package.json"].join(path.sep)), // cli version,
            InfoAction.getLatestReleaseFromGitHub("olaferlandsen", "twf-cli"),
            InfoAction.readJsonFile([process.cwd(), "package.json"].join(path.sep)), // project version
            InfoAction.getLatestReleaseFromGitHub("olaferlandsen", "ts-web-framework"),
            InfoAction.npmVersion()
        ])
            .then((itm:any[]) => {
                console.log(c.bold.green("TypeScript Web Framework"));
                console.log(c.bold.green("------------------------"));
                InfoAction.printVersion("  Current CLI Version     :", itm[0].version, itm[1].tag_name);
                InfoAction.printVersion("  Current Project Version :", itm[2].version, itm[3].tag_name);
                InfoAction.printVersion("  Current NPM Version     :", itm[4], "4.0.0");
                InfoAction.printVersion("  Current Node Version    :", process.version, "6.0.0");
                process.exit(0);
            })
            .catch(e => {
                console.error(c.bold.red("Error...", e.toString()));
                process.exit(1);
            });
    }
    // prints version status
    public static printVersion (name: string, current:string, latest:string):void {
        let text : string = c.symbols.check;
        let fn : string = "greenBright";
        if (compareVersions(current, latest) === -1) {
            text = c.symbols.cross;
            fn = "redBright";
        }
        console.log([
            c.bold.gray(name),
            c.bold.green(current),
            c.bold.gray("("),
            c.bold[fn](text),
            c.bold.gray(")")
        ].join(' '));
    }
    // get npm version number
    public static npmVersion ():Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let version : string;
            let cmd : ChildProcess = spawn(InfoAction.npm, ["-v"]);
            cmd.stdout.on("data", d => version = (d.toString() || "").trim().replace(/\s+/,''));
            cmd.on( 'close', c => {
                if (c > 0) reject(c);
                else resolve(version)
            });
        })
    }
    // read and convert json file to json object
    public static readJsonFile (file:string):Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.exists(file, (exists:boolean)=> {
                if (exists === true) {
                    fs.readFile(file, (e:any, d:any) => {
                        if (!e) resolve(JSON.parse( d.toString() ));
                        else reject(e);
                    })
                }
                else reject("file don't exists");
            })
        });
    }
    // get last tag_name repository from Github
    public static getLatestReleaseFromGitHub(user:string, repo:string):Promise<any> {
        return new Promise<string>((resolve, reject) => {
            try {
                https.get({
                    protocol: "https:",
                    host: "api.github.com",
                    hostname: "api.github.com",
                    port: "443",
                    method: "GET",
                    path: "/repos/" + user + "/" + repo + "/releases/latest?client_id=b5e9fc2bf9759c6eef3d&client_secret=8b5fddb02959e02b7e3397117b2fd4c214436abe",
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
                    },
                    timeout : 1000
                }, (res: any) => {
                    let data: string = '';
                    res.on("data", (chunk: any) => data += chunk);
                    res.on("end", () => {
                        try {
                            resolve(JSON.parse(data));
                        }
                        catch (e) {
                            reject(e)
                        }
                    });
                    res.on("error", (e: any) => reject(e));
                })
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
