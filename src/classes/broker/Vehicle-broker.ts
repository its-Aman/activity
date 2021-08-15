import { Vehicle, Driver } from "..";

export class VehicleBroker {
    private constructor() { }

    public static getVehicleByRegistrationNumber(reg_number: string, driver: Driver): Vehicle {
        const vehicle = new Vehicle(reg_number, driver)
        return vehicle
    }


}