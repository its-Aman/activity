import { IVehicle, IDriver } from "../interfaces"

export class Vehicle implements IVehicle {
    private _registration_number: string
    private _driver: IDriver

    public get registration_number(): string {
        return this._registration_number
    }

    public set registration_number(value: string) {
        this._registration_number = value
    }

    public get driver(): IDriver {
        return this._driver
    }
    public set driver(value: IDriver) {
        this._driver = value
    }

    constructor(reg_number: string, driver: IDriver) {
        this.registration_number = reg_number
        this.driver = driver
    }
}