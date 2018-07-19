"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("../Helpers");
let path = require("path");
let fs = require("fs");
let c = require("ansi-colors");
class RmAction {
    constructor(argv) {
        RmAction.argv = argv;
        RmAction.directory = process.cwd();
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
        let dirPath = [RmAction.directory, "src", "controllers"]
            .concat(segments.slice(0, segments.length - 1))
            .join(path.sep);
        let ctrlPath = dirPath + path.sep + name + "Controller.ts";
        let route = (rootRoute || "" || name)
            .trim()
            .replace(/(^\/+|\/+$)/g, '')
            .replace(/\/+/g, '/');
        if (fs.existsSync(ctrlPath)) {
            fs.unlink(ctrlPath, (err) => {
                if (err) {
                    console.log(c.bold.gray(c.bold.red(c.symbols.cross), `The controller ${name} could not be remove: ${err.toString()}`));
                    process.exit(1);
                }
                else {
                    console.log(c.bold.gray(c.bold.green(c.symbols.check), `The controller ${name} was remove correctly`));
                    process.exit(0);
                }
            });
        }
        else {
            console.log(c.bold.gray(c.bold.yellow(c.symbols.warning), `The controller ${name} does not exists: ${ctrlPath}`));
            process.exit(0);
        }
    }
}
RmAction.argv = [];
exports.RmAction = RmAction;
