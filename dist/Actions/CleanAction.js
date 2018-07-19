"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let path = require("path");
let fs = require("fs");
class CleanAction {
    constructor(...args) {
        CleanAction.args = args;
        CleanAction.directory = process.cwd();
        ["dist", "www", "node_modules", "temp", "package-lock.json"]
            .map((route) => this.remove.apply(this, [
            CleanAction.directory + path.sep + route
        ]));
    }
    remove(dir_path) {
        if (fs.existsSync(dir_path)) {
            fs.readdirSync(dir_path).forEach((entry) => {
                let entry_path = path.join(dir_path, entry);
                if (fs.lstatSync(entry_path).isDirectory())
                    this.remove(entry_path);
                else
                    fs.unlinkSync(entry_path);
            });
            fs.rmdirSync(dir_path);
        }
    }
}
CleanAction.args = [];
exports.CleanAction = CleanAction;
