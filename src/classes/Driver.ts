import { IDriver } from "../interfaces"

export class Driver implements IDriver {
    private _age: number

    public get age(): number {
        return this._age
    }

    public set age(value: number) {
        this._age = value
    }

    constructor(age: number) {
        this.age = age
    }
}