export class Helpers {
    static camelize(value:string):string {
        return value
            .replace(/\W+(.)/g, (m:string, c:string):string => c.toUpperCase())
            .replace(/^./, Function.call.bind(''.toUpperCase));
    }
}
