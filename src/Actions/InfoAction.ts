let https = require("https");
let path = require("path");
let fs = require("fs");
let c = require("ansi-colors");
let compareVersions = require("compare-versions");
import {spawnSync} from "child_process";


export class InfoAction {
    readonly npm :string = /^win/i.test(process.platform)? "npm.cmd" : "npm";

    constructor () {
        let npmv = spawnSync(this.npm, ["-v"]).stdout.toString().replace(/\s+/,'');
        let printVersion = (name: string, current:string, latest:string, texts? : {down:string, up : string}) => {
            if (!texts) texts = {
                down : "outdated",
                up : "updated"
            };
            if (!texts.up) texts.up = "updated";
            if (!texts.down) texts.down = "outdated";


            let text : string = texts.up;
            let fn : string = "greenBright";
            if (compareVersions(current, latest) === -1) {
                text = texts.down;
                fn = "redBright";
            }
            console.log(
                c.bold.gray(name,
                    c.bold.green(current),
                    c.bold("(",c.bold[fn](text),")")
                )
            );
        };
        Promise.all([
            InfoAction.getLastCliRelease(),
            InfoAction.getLastFrameworkRelease()
        ]).then((latest:string[]) => {
            printVersion("CLI Version     :", InfoAction.cliVersion(), latest[0] || "0",  {
                up : c.symbols.check,
                down : c.symbols.cross
            });
            printVersion("Project Version :", InfoAction.projectVersion(), latest[1] || "0",  {
                up : c.symbols.check,
                down : c.symbols.cross
            });
            printVersion("NPM Version     :", npmv, "4.0.0", {
                up : c.symbols.check,
                down : c.symbols.cross
            });
            printVersion("Node Version    :", process.version, "6.0.0", {
                up : c.symbols.check,
                down : c.symbols.cross
            });
        })
            .catch(() => console.error(c.bold.red("Error...")));
    }

    public static getLastCliRelease ():Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                https.get({
                    protocol : "https:",
                    host : "api.github.com",
                    hostname : "api.github.com",
                    port : "443",
                    method : "GET",
                    path : "/repos/olaferlandsen/twf-cli/releases/latest",
                    headers : {
                        "user-agent" : "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
                    },
                    timeout : 1000
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
            }
            catch (e) {
                reject(e);
            }
        });
    }
    public static getLastFrameworkRelease ():Promise<string> {
        return new Promise<string>((resolve, reject) => {
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
                    timeout : 1000
                }, (res: any) => {
                    let data: any = '';
                    res.on("data", (chunk: any) => data += chunk);
                    res.on("end", () => {
                        try {
                            resolve(JSON.parse(data).tag_name);
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



    static cliVersion ():string {
        return JSON.parse(
            fs.readFileSync([
                path.dirname(path.dirname(__dirname)),
                path.sep,
                "package.json"
            ].join(path.sep))
        ).version;
    }

    static projectVersion ():string {
        return JSON.parse(
            fs.readFileSync([
                process.cwd(),
                path.sep,
                "package.json"
            ].join(path.sep))
        ).version;
    }
}
