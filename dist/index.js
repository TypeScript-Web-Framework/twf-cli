"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const AddAction_1 = require("./Actions/AddAction");
const InitAction_1 = require("./Actions/InitAction");
const VerifyAction_1 = require("./Actions/VerifyAction");
const HelpAction_1 = require("./Actions/HelpAction");
new (_a = class Binary {
        constructor() {
            Binary.argv = process.argv.slice(2);
            Binary.onAction(Binary.argv[0]);
        }
        static onAction(action) {
            switch (action) {
                case "add":
                    new AddAction_1.AddAction(Binary.argv.slice(1));
                    break;
                case "init":
                    new InitAction_1.InitAction(Binary.argv.slice(1));
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
