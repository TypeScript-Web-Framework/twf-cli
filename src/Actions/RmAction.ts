import {AddAction} from "./AddAction";
import {Helpers} from "../Helpers";

let path = require("path");
let fs = require("fs");
let c = require("ansi-colors");

export class RmAction {
    public static argv : string [] = [];
    public static directory : string;

    public constructor (argv: string[]) {
        AddAction.argv = argv;
        switch (argv[0]) {
            case "controller":this.controller.apply(this, argv.slice(1));break;
            //case "http":this.controller.apply(this, argv.slice(1));break;
        }
    }
    public controller (controller:string, rootRoute?:string):void {
        controller = Helpers.sanitizeUri(controller.replace('\\', '/'));
        rootRoute = Helpers.sanitizeUri(rootRoute);
        let segments : string[] = controller.split('/').map(v => Helpers.camelize(v));
        if (segments.length === 0) throw new Error("controller is empty");
        let name : string = Helpers.camelize(segments[ segments.length -1 ]);
        let dirPath: string = [AddAction.directory, "src", "controllers"]
            .concat(segments.slice(0, segments.length-1))
            .join(path.sep);
        let ctrlPath: string = dirPath + path.sep + name + "Controller.ts";
        let route : string = (rootRoute || "" || name)
            .trim()
            .replace(/(^\/+|\/+$)/g, '')
            .replace(/\/+/g,'/');

        if (fs.existsSync(ctrlPath)) {
            fs.unlink(ctrlPath, (err:any) => {
                if (err) {
                    console.log(c.bold.gray(c.bold.red(c.symbols.cross), `The controller ${name} could not be remove: ${err.toString()}`));
                    process.exit(1)
                }
                else {
                    console.log(c.bold.gray(c.bold.green(c.symbols.check), `The controller ${name} was remove correctly`));
                    process.exit(0)
                }
            })
        }
        else {
            console.log(c.bold.gray(c.bold.yellow(c.symbols.warning), `The controller ${name} does not exists: ${ctrlPath}`));
            process.exit(0)
        }
    }
}
