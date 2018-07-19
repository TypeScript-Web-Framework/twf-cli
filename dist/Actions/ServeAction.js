"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class ServeAction {
    constructor() {
        this.npm = /^win/i.test(process.platform) ? "npm.cmd" : "npm";
        this.serve().then(() => {
            process.exit(0);
        }).catch((e) => {
            process.exit(1);
        });
    }
    serve() {
        return new Promise((resolve, reject) => {
            let command = child_process_1.spawn(this.npm, ["run", "serve"]);
            command.on("error", (e) => reject(e));
            command.on("exit", () => resolve());
            command.on("message", (m) => console.log(m));
        });
    }
}
exports.ServeAction = ServeAction;
