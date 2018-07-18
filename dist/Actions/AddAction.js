"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("../Helpers");
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
