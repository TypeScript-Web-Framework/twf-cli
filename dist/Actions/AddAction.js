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
        let dot = "../".repeat(segments.length);
        content.push('import {HttpPost, HttpGet, HttpPut, HttpDelete} from "' + dot + 'annotations/Http";');
        content.push('import {Controller} from "' + dot + 'core/Controller";');
        content.push('import {Api} from "' + dot + 'annotations/Api";');
        content.push('@Api');
        content.push(`export class ${name}Controller extends Controller {`);
        content.push(`    @HttpPost("/${route}")`);
        content.push('    public create () {');
        content.push('        this.httpCreated();');
        content.push('    }');
        content.push(`    @HttpGet("/${route}")`);
        content.push('    public read () {');
        content.push('        this.httpOk();');
        content.push('    }');
        content.push(`    @HttpPut("/${route}")`);
        content.push('    public update () {');
        content.push('        this.httpOk();');
        content.push('    }');
        content.push(`    @HttpDelete("/${route}")`);
        content.push('    public delete () {');
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
}
AddAction.argv = [];
exports.AddAction = AddAction;
