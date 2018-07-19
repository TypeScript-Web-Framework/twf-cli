import {Helpers} from "../Helpers";
let path = require("path");
let fs = require("fs");
let c = require("ansi-colors");
let mkdir = require("mkdirp");

export class AddAction {
    public static argv : string [] = [];
    public static directory : string;
    public constructor (argv: string[]) {
        AddAction.argv = argv;
        AddAction.directory = process.cwd();

        switch (argv[0]) {
            case "controller":
                this.controller.apply(this, argv.slice(1));
                break;
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
        let content : string[] = [];
        let dot :string = "../".repeat(segments.length);
        content.push('import {HttpPost, HttpGet, HttpPut, HttpDelete} from "' +dot+ 'annotations/Http";');
        content.push('import {Controller} from "' + dot + 'core/Controller";');
        content.push('import {Api} from "' + dot + 'annotations/Api";');
        content.push('@Api');
        content.push(`export class ${ name }Controller extends Controller {`);

        content.push(`    @HttpPost("/${ route }")`);
        content.push('    public create () {');
        content.push('        this.httpCreated();');
        content.push('    }');

        content.push(`    @HttpGet("/${ route }")`);
        content.push('    public read () {');
        content.push('        this.httpOk();');
        content.push('    }');

        content.push(`    @HttpPut("/${ route }")`);
        content.push('    public update () {');
        content.push('        this.httpOk();');
        content.push('    }');

        content.push(`    @HttpDelete("/${ route }")`);
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
                    encoding : "utf8",
                    flag: "w"
                }, (err:any) => {
                    if (err) {
                        console.log(c.bold.redBright("Can't save file:", err.toString()));
                        process.exit(1);
                    } else {
                        console.log(c.bold.green(`Controller ${name} saved on`, c.bold.magentaBright(ctrlPath)));
                        console.log(c.bold.green(`Set default route to`, c.bold.magentaBright(route)));
                        process.exit(0)
                    }
                });
            });
        }
    }
    public mkdir (dirPath : string):Promise<any> {
        return new Promise((resolve) => {
            if (!fs.existsSync(dirPath)) mkdir(dirPath, ()=> resolve());
            else resolve();
        })
    }
}
