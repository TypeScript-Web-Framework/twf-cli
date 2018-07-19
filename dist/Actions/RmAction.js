"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddAction_1 = require("./AddAction");
class RmAction {
    constructor(argv) {
        AddAction_1.AddAction.argv = argv;
        switch (argv[0]) {
            case "controller":
                this.controller.apply(this, argv.slice(1));
                break;
            case "http":
                this.controller.apply(this, argv.slice(1));
                break;
        }
    }
    controller() {
    }
    http() {
    }
}
RmAction.argv = [];
exports.RmAction = RmAction;
