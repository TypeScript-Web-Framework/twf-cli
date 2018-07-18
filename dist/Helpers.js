"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
    static camelize(value) {
        return value
            .replace(/\W+(.)/g, (m, c) => c.toUpperCase())
            .replace(/^./, Function.call.bind(''.toUpperCase));
    }
}
exports.Helpers = Helpers;
