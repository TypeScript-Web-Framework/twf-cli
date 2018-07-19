"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("../Helpers");
let path = require("path");
let fs = require("fs");
class AddAction {
    constructor(argv) {
        console.log("argv", argv);
        AddAction.argv = argv;
        switch (argv[0]) {
            case "controller":
                this.controller.apply(this, argv.slice(1));
                break;
        }
    }
    controller(...args) {
        console.log(`Adding new controller ${args[0]}`);
        let content = "";
        content += 'import {Http} from "../annotations/Http";';
        content += 'import {Controller} from "../core/Controller";';
        content += 'import {Api} from "../annotations/Api";';
        content += '@Api';
        content += `export class ${Helpers_1.Helpers.camelize(args[0])} extends Controller {`;
        content += `    @Http("/${Helpers_1.Helpers.camelize(args[0])}")`;
        content += '    public index () {';
        content += '        this.httpOk();';
        content += '    }';
        content += '}';
        console.log(`End.`);
    }
    action(...args) {
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
