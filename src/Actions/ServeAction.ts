import {spawn} from 'child_process'
export class ServeAction {
    readonly npm :string = /^win/i.test(process.platform)? "npm.cmd" : "npm";

    constructor () {
        this.serve().then(() => {
            process.exit(0);
        }).catch((e) => {
            process.exit(1)
        });
    }

    serve ():Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let command = spawn(this.npm, ["run", "serve"]);
            command.on("error", (e:any) => reject(e));
            command.on("exit", () => resolve());
            command.on("message", (m) => console.log(m))
        })
    }
}
