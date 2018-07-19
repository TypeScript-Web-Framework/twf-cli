import {AddAction} from "./AddAction";

export class RmAction {
    public static argv : string [] = [];
    public static directory : string;

    public constructor (argv: string[]) {
        AddAction.argv = argv;
        switch (argv[0]) {
            case "controller":this.controller.apply(this, argv.slice(1));break;
            case "http":this.controller.apply(this, argv.slice(1));break;
        }
    }


    controller () {

    }

    http () {

    }
}
