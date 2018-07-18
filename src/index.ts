import {AddAction} from "./Actions/AddAction";
import {InitAction} from "./Actions/InitAction";


declare type Actions = "add" | "rm" | "check" | "serve" | "clean" | "test" | "package" | "init";

new (class Binary {
    public static argv : string[] = [];
    public constructor () {
        console.log("init");
        Binary.argv = process.argv.slice(2);
        Binary.onAction(Binary.argv[0] as Actions);
    }

    static onAction (action: Actions):void {
        console.log("onAction:", action);

        switch (action) {
            case "add": new AddAction(Binary.argv.slice(1));break;
            case "init": new InitAction(Binary.argv.slice(1));break;
            case "check": new InitAction(Binary.argv.slice(1));break;
            default:
                console.log(`Invalid action: ${action}`);
                process.exit(1);
                break;
        }
    }


})();
