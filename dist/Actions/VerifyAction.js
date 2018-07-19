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
        if (!this.isValid()) {
            console.log("This project is not valid");
            console.log("Exit with code 1");
            process.exit(1);
        }
        else {
            console.log("This project is valid");
            process.exit(0);
        }
    }
    isValid() {
        for (let file of VerifyAction.files) {
            let filePath = VerifyAction.directory + path.sep + file.name;
            console.log(c.bold.blue("Checking ", c.italic.black(file.type), c.gray(":"), c.underline.cyan(filePath)));
            if (!this.exists(filePath)) {
                console.log("    ", c.bold.red(c.symbols.cross, "File don't exists"));
                console.log("    ", c.bold.red("Invalid project!"));
                process.exit(1);
            }
            else {
                console.log("    ", c.bold.green(c.symbols.check, "File exists"));
                if (file.type === "dir" && !this.isDir(filePath))
                    return false;
                if (file.type === "file" && !this.isFile(filePath))
                    return false;
                if (file.type === "symbolic" && !this.isSymbolicLink(filePath))
                    return false;
                if (typeof file.cheksum === "string") {
                    if (this.checksum(filePath) !== file.cheksum) {
                        return false;
                    }
                }
            }
        }
        return true;
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
