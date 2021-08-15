import { Driver } from "..";

export class DriverBroker {
    private constructor() { }

    public static getDriver(age: number) {
        const driver = new Driver(age)
        return driver
    }
}