export class Logging {
    public static IS_LOCAL = false

    constructor() { }

    public static print(message: string) {
        console.log(message)
    }

    public static log(message: any, ...optionalParams: any[]) {
        if (Logging.IS_LOCAL)
            console.log(message, optionalParams)
    }
}