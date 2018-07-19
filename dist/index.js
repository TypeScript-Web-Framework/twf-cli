"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const AddAction_1 = require("./Actions/AddAction");
const StartAction_1 = require("./Actions/StartAction");
const VerifyAction_1 = require("./Actions/VerifyAction");
const HelpAction_1 = require("./Actions/HelpAction");
const ServeAction_1 = require("./Actions/ServeAction");
const RmAction_1 = require("./Actions/RmAction");
new (_a = class Binary {
        constructor() {
            Binary.argv = process.argv.slice(2);
            Binary.onAction(Binary.argv[0]);
        }
        static onAction(action) {
            switch (action) {
                case "serve":
                    new ServeAction_1.ServeAction();
                    break;
                case "add":
                    new AddAction_1.AddAction(Binary.argv.slice(1));
                    break;
                case "rm":
                case "remove":
                    new RmAction_1.RmAction(Binary.argv.slice(1));
                    break;
                case "start":
                    new StartAction_1.StartAction(Binary.argv.slice(1));
                    break;
                case "verify":
                    new VerifyAction_1.VerifyAction(Binary.argv.slice(1));
                    break;
                case "help":
                case "--help":
                case "-h":
                    new HelpAction_1.HelpAction();
                    break;
                default:
                    console.log(`Invalid action: ${action}`);
                    console.log("see help with: twf --help");
                    process.exit(1);
                    break;
            }
        }
    },
    _a.argv = [],
    _a)();
