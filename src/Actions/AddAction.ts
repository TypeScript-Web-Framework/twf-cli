import {Helpers} from "../Helpers";
import {Controller} from "../../Proyecto/src/core/Controller";
import {IndexController} from "../../Proyecto/src/controllers/IndexController";

let path = require("path");
let fs = require("fs");


export class AddAction {
    public static argv : string [] = [];
    public static directory : string;

    public constructor (argv: string[]) {
        console.log("argv", argv);
        AddAction.argv = argv;
        switch (argv[0]) {
            case "controller":
                this.controller.apply(this, argv.slice(1));
                break;
        }
    }

    public controller (...args:string[]) {
        console.log(`Adding new controller ${args[0]}`);
        let content : string = "";
        content += 'import {Http} from "../annotations/Http";';
        content += 'import {Controller} from "../core/Controller";';
        content += 'import {Api} from "../annotations/Api";';
        content += '@Api';
        content += `export class ${ Helpers.camelize(args[0]) } extends Controller {`;
        content += `    @Http("/${ Helpers.camelize(args[0]) }")`;
        content += '    public index () {';
        content += '        this.httpOk();';
        content += '    }';
        content += '}';
        console.log(`End.`)
    }


    public action (...args:string[]) {

        let name: string = Helpers.camelize(args[0]) + "Controller";
        let controller: string = fs.readFileSync([
            AddAction.directory,
            "src",
            "controller",
            name + ".ts"
        ].join(path.sep));


        let actionContent : string = "";

        actionContent += "\n";
        actionContent += `    @Http("/")`;
        actionContent += '    public index () {';
        actionContent += '        this.httpOk();';
        actionContent += '    }';
        actionContent += "\n";


        let regex = /(\s+@Api\s+export\s+class\s+(([a-z0-9_]+)Controller)\s+extends\s+Controller(\s+)?\{)/i;
        let match = controller.match(regex);
        controller.replace(match[1], "$1")

    }



    public crud (...args:string[]) {
        console.log(`Adding new controller ${args[0]}`);
        let content : string = "";
        content += 'import {HttpPost, HttpGet, HttpPut, HttpDelete} from "../annotations/Http";';
        content += 'import {Controller} from "../core/Controller";';
        content += 'import {Api} from "../annotations/Api";';
        content += '@Api';
        content += `export class ${ Helpers.camelize(args[0]) } extends Controller {`;

        content += `    @HttpPost("/${ Helpers.camelize(args[0]) }")`;
        content += '    public create () {';
        content += '        this.httpCreated();';
        content += '    }';

        content += `    @HttpGet("/${ Helpers.camelize(args[0]) }")`;
        content += '    public read () {';
        content += '        this.httpOk();';
        content += '    }';

        content += `    @HttpPut("/${ Helpers.camelize(args[0]) }")`;
        content += '    public update () {';
        content += '        this.httpOk();';
        content += '    }';

        content += `    @HttpDelete("/${ Helpers.camelize(args[0]) }")`;
        content += '    public delete () {';
        content += '        this.httpOk();';
        content += '    }';

        content += '}';
        console.log(`End.`)
    }
}
