"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require("fs");
let path = require("path");
let crypto = require('crypto');
let c = require("ansi-colors");
class VerifyAction {
    constructor(args) {
        VerifyAction.directory = process.cwd();
        VerifyAction.args = args;
        let message;
        if (!this.isValid())
            message = "This project is not valid:";
        else
            message = "This project is valid:";
        console.log(c.bold.gray(c.symbols.cross, message, c.bold.green(VerifyAction.files.length), "files checked", c.bold.red(VerifyAction.stats.negative), "problems"));
        process.exit(VerifyAction.stats.negative === 0 ? 0 : 1);
    }
    isValid() {
        for (let file of VerifyAction.files) {
            let filePath = VerifyAction.directory + path.sep + file.name;
            if (!this.exists(filePath)) {
                VerifyAction.stats.negative++;
                VerifyAction.stats.dontExists++;
            }
            else {
                VerifyAction.stats.exists++;
                if (file.type === "dir" && !this.isDir(filePath)) {
                    VerifyAction.stats.negative++;
                }
                if (file.type === "file" && !this.isFile(filePath)) {
                    VerifyAction.stats.negative++;
                }
                if (file.type === "symbolic" && !this.isSymbolicLink(filePath)) {
                    VerifyAction.stats.negative++;
                }
                if (typeof file.cheksum === "string") {
                    if (this.checksum(filePath) !== file.cheksum) {
                        VerifyAction.stats.negative++;
                    }
                }
            }
        }
        return VerifyAction.stats.negative === 0;
    }
    checksum(filePath) {
        return crypto
            .createHash("sha1")
            .update(fs.readFileSync(filePath, "utf8"), 'utf8')
            .digest('hex');
    }
    isDir(path) {
        return fs.lstatSync(path).isDirectory();
    }
    isFile(path) {
        return fs.lstatSync(path).isFile();
    }
    isSymbolicLink(path) {
        return fs.lstatSync(path).isSymbolicLink();
    }
    exists(path) {
        return fs.existsSync(path);
    }
}
VerifyAction.args = [];
VerifyAction.stats = {
    positive: 0,
    negative: 0,
    exists: 0,
    dontExists: 0
};
VerifyAction.files = [
    { name: "package.json", type: "file" },
    { name: "gulpfile.js", type: "file" },
    { name: "tsconfig.json", type: "file" },
    { name: "src", type: "dir" },
    { name: "src/manifiest.json", type: "file" },
    { name: "src/typings.d.ts", type: "file" },
    { name: "src/server.ts", type: "file" },
    { name: "src/app.ts", type: "file" },
    { name: "src/core", type: "dir" },
    { name: "src/core/Annotations.ts", type: "file" },
    { name: "src/core/Controller.ts", type: "file" },
    { name: "src/core/Exception.ts", type: "file" },
    { name: "src/core/Manifiest.ts", type: "file" },
    { name: "src/core/Middleware.ts", type: "file" },
    { name: "src/core/MiddlewareInject.ts", type: "file" },
    { name: "src/annotations", type: "dir" },
    { name: "src/annotations/Api.ts", type: "file" },
    { name: "src/annotations/Http.ts", type: "file" },
];
exports.VerifyAction = VerifyAction;
