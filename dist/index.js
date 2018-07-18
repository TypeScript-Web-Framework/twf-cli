"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const AddAction_1 = require("./Actions/AddAction");
const InitAction_1 = require("./Actions/InitAction");
new (_a = class Binary {
        constructor() {
            console.log("init");
            Binary.argv = process.argv.slice(2);
            Binary.onAction(Binary.argv[0]);
        }
        static onAction(action) {
            console.log("onAction:", action);
            switch (action) {
                case "add":
                    new AddAction_1.AddAction(Binary.argv.slice(1));
                    break;
                case "init":
                    new InitAction_1.InitAction(Binary.argv.slice(1));
                    break;
                default:
                    console.log(`Invalid action: ${action}`);
                    process.exit(1);
                    break;
            }
        }
    },
    _a.argv = [],
    _a)();
