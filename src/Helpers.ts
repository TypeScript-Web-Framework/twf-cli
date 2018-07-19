import {Observable} from "rxjs/internal/Observable";
import {interval} from "rxjs/internal/observable/interval";
import Timer = NodeJS.Timer;

export class Helpers {
    static camelize(value:string):string {
        return value
            .replace(/\W+(.)/g, (m:string, c:string):string => c.toUpperCase())
            .replace(/^./, Function.call.bind(''.toUpperCase));
    }

    static sanitizeUri (value : string):string {
        return (value || "")
            .trim()
            .replace(/(^\/+|\/+$)/g, '')
            .replace(/\/+/g,'/');
    }

    static loading (speed: number = 250):any {

        let interval : Timer = null;
        let P : string[] = ["\\", "|", "/", "-"];
        let x  : number = 0;

        return {
            start : () => {
                interval = setInterval(() => {
                    process.stdout.write("\r" + P[x++]);
                    x &= 3;
                }, speed);
                return {
                    end : () => {
                        clearInterval(interval)
                        process.stdout.write("\r" + "");
                    }
                }
            }
        }

    }
}
