export class Util {
    constructor() { }

    public static cleanRegNumber(reg_number: string): string {
        return reg_number.replace(/\r?\n|\r/ig, '')
    }

}