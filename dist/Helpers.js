"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
    static camelize(value) {
        return value
            .replace(/\W+(.)/g, (m, c) => c.toUpperCase())
            .replace(/^./, Function.call.bind(''.toUpperCase));
    }
    static sanitizeUri(value) {
        return (value || "")
            .trim()
            .replace(/(^\/+|\/+$)/g, '')
            .replace(/\/+/g, '/');
    }
}
exports.Helpers = Helpers;
