let fs = require("fs");
let path = require("path");
let c = require("ansi-colors");
export class HelpAction {
    constructor () {
        let content : string = fs.readFileSync(path.dirname(path.dirname(__dirname))+ path.sep + "docs" + path.sep + "README.md" ).toString();
        content = content.replace(
            /^(#{1,}\s+?([^\n]+))$/igm,
            c.bold.black.underline("$2")
        );
        content = content.replace(
            /(```(bash|typescript)\s+?([^`]+)```)/igm,
            c.italic.green("$ $3")
        );
        content = content.replace(
            /(`([^`]+)`)/igm,
            c.italic.magentaBright("$2")
        );

        content = content.replace(
            /^(>([^\n]+))$/igm,
            c.italic.gray("$2")
        );

        content = content.replace(
            /(\*\*([^\*]+)\*\*)/ig,
            c.bold("$2")
        );

        content = content.replace(
            /(\*([^\*]+)\*)/ig,
            c.italic("$2")
        );
        console.log(content);
        process.exit(0);

    }
}
