import {AddAction} from "./Actions/AddAction";
import {StartAction} from "./Actions/StartAction";
import {VerifyAction} from "./Actions/VerifyAction";
import {HelpAction} from "./Actions/HelpAction";
import {ServeAction} from "./Actions/ServeAction";
import {RmAction} from "./Actions/RmAction";
import {InstallAction} from "./Actions/InstallAction";
import {InfoAction} from "./Actions/InfoAction";
import {PackageAction} from "./Actions/PackageAction";
import {BuildAction} from "./Actions/BuildAction";
import {TestAction} from "./Actions/TestAction";


declare type Actions = "build" | "install" | "add" | "rm" | "remove" | "verify" | "serve" | "clean" | "test" | "package" | "pkg" | "compile" | "start" | "help" | "--help" | "-h" | "-v" | "--version" | "info";

new (class Binary {
    public static argv : string[] = [];
    public constructor () {
        Binary.argv = process.argv.slice(2);
        Binary.onAction(Binary.argv[0] as Actions);
    }

    static onAction (action: Actions):void {
        switch (action) {
            case "info":
            case "-v":
            case "--version":
                new InfoAction();break;


            case "serve":
                new ServeAction();break;

            case "build":
                new BuildAction();break;

            case "test":
                new TestAction();break;

            case "package":
            case "pkg":
                new PackageAction();break;


            case "install":
                new InstallAction();break;
            case "add":
                new AddAction(Binary.argv.slice(1));break;
            case "rm":
            case "remove":
                new RmAction(Binary.argv.slice(1));break;
            case "start":
                new StartAction(Binary.argv.slice(1));break;
            case "verify":
                new VerifyAction(Binary.argv.slice(1));break;
            case "help":
            case "--help":
            case "-h":
                new HelpAction();break;
            default:
                console.log(`Invalid action: ${action}`);
                console.log("see help with: twf --help");
                process.exit(1);
                break;
        }
    }


})();
