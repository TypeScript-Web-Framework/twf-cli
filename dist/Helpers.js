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
    static loading(speed = 250) {
        let interval = null;
        let P = ["\\", "|", "/", "-"];
        let x = 0;
        return {
            start: () => {
                interval = setInterval(() => {
                    process.stdout.write("\r" + P[x++]);
                    x &= 3;
                }, speed);
                return {
                    end: () => {
                        clearInterval(interval);
                        process.stdout.write("\r" + "");
                    }
                };
            }
        };
    }
}
exports.Helpers = Helpers;
