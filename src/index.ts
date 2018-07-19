import {AddAction} from "./Actions/AddAction";
import {InitAction} from "./Actions/InitAction";
import {VerifyAction} from "./Actions/VerifyAction";
import {HelpAction} from "./Actions/HelpAction";


declare type Actions = "add" | "rm" | "verify" | "serve" | "clean" | "test" | "package" | "init" | "help" | "--help" | "-h";

new (class Binary {
    public static argv : string[] = [];
    public constructor () {
        Binary.argv = process.argv.slice(2);
        Binary.onAction(Binary.argv[0] as Actions);
    }

    static onAction (action: Actions):void {
        switch (action) {
            case "add": new AddAction(Binary.argv.slice(1));break;
            case "init": new InitAction(Binary.argv.slice(1));break;
            case "verify": new VerifyAction(Binary.argv.slice(1));break;
            case "help":
            case "--help":
            case "-h":new HelpAction();break;
            default:
                console.log(`Invalid action: ${action}`);
                console.log("see help with: twf --help");
                process.exit(1);
                break;
        }
    }


})();
