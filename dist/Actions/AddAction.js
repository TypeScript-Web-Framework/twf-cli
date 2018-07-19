"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("../Helpers");
let path = require("path");
let fs = require("fs");
let c = require("ansi-colors");
let mkdir = require("mkdirp");
class AddAction {
    constructor(argv) {
        AddAction.argv = argv;
        AddAction.directory = process.cwd();
        switch (argv[0]) {
            case "controller":
                this.controller.apply(this, argv.slice(1));
                break;
            case "http":
                this.http.apply(this, argv.slice(1));
                break;
            case "crud":
                this.http.apply(this, argv.slice(1));
                break;
        }
    }
    controller(controller, rootRoute) {
        controller = Helpers_1.Helpers.sanitizeUri(controller.replace('\\', '/'));
        rootRoute = Helpers_1.Helpers.sanitizeUri(rootRoute);
        let segments = controller.split('/').map(v => Helpers_1.Helpers.camelize(v));
        if (segments.length === 0)
            throw new Error("controller is empty");
        let name = Helpers_1.Helpers.camelize(segments[segments.length - 1]);
        let dirPath = [AddAction.directory, "src", "controllers"]
            .concat(segments.slice(0, segments.length - 1))
            .join(path.sep);
        let ctrlPath = dirPath + path.sep + name + "Controller.ts";
        let route = (rootRoute || "" || name)
            .trim()
            .replace(/(^\/+|\/+$)/g, '')
            .replace(/\/+/g, '/');
        let content = [];
        content.push('import {Http} from "../annotations/Http";');
        content.push('import {Controller} from "../core/Controller";');
        content.push('import {Api} from "../annotations/Api";');
        content.push('@Api');
        content.push(`export class ${name}Controller extends Controller {`);
        content.push(`    @Http("/${route}")`);
        content.push('    public index () {');
        content.push('        this.httpOk();');
        content.push('    }');
        content.push('}');
        if (fs.existsSync(ctrlPath)) {
            console.log(c.bold.redBright("File already exists:", c.bold.magentaBright(ctrlPath)));
            process.exit(1);
        }
        else {
            this.mkdir(dirPath).then(() => {
                fs.writeFile(ctrlPath, content.join("\n"), {
                    encoding: "utf8",
                    flag: "w"
                }, (err) => {
                    if (err) {
                        console.log(c.bold.redBright("Can't save file:", err.toString()));
                        process.exit(1);
                    }
                    else {
                        console.log(c.bold.green(`Controller ${name} saved on`, c.bold.magentaBright(ctrlPath)));
                        console.log(c.bold.green(`Set default route to`, c.bold.magentaBright(route)));
                        process.exit(0);
                    }
                });
            });
        }
    }
    mkdir(dirPath) {
        return new Promise((resolve) => {
            if (!fs.existsSync(dirPath))
                mkdir(dirPath, () => resolve());
            else
                resolve();
        });
    }
    http(...args) {
        let name = Helpers_1.Helpers.camelize(args[0]) + "Controller";
        let controller = fs.readFileSync([
            AddAction.directory,
            "src",
            "controller",
            name + ".ts"
        ].join(path.sep));
        let actionContent = "";
        actionContent += "\n";
        actionContent += `    @Http("/")`;
        actionContent += '    public index () {';
        actionContent += '        this.httpOk();';
        actionContent += '    }';
        actionContent += "\n";
        let regex = /(\s+@Api\s+export\s+class\s+(([a-z0-9_]+)Controller)\s+extends\s+Controller(\s+)?\{)/i;
        let match = controller.match(regex);
        controller.replace(match[1], "$1");
    }
    crud(...args) {
        console.log(`Adding new controller ${args[0]}`);
        let content = "";
        content += 'import {HttpPost, HttpGet, HttpPut, HttpDelete} from "../annotations/Http";';
        content += 'import {Controller} from "../core/Controller";';
        content += 'import {Api} from "../annotations/Api";';
        content += '@Api';
        content += `export class ${Helpers_1.Helpers.camelize(args[0])} extends Controller {`;
        content += `    @HttpPost("/${Helpers_1.Helpers.camelize(args[0])}")`;
        content += '    public create () {';
        content += '        this.httpCreated();';
        content += '    }';
        content += `    @HttpGet("/${Helpers_1.Helpers.camelize(args[0])}")`;
        content += '    public read () {';
        content += '        this.httpOk();';
        content += '    }';
        content += `    @HttpPut("/${Helpers_1.Helpers.camelize(args[0])}")`;
        content += '    public update () {';
        content += '        this.httpOk();';
        content += '    }';
        content += `    @HttpDelete("/${Helpers_1.Helpers.camelize(args[0])}")`;
        content += '    public delete () {';
        content += '        this.httpOk();';
        content += '    }';
        content += '}';
        console.log(`End.`);
    }
}
AddAction.argv = [];
exports.AddAction = AddAction;
