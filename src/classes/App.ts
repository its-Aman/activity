import { EAction } from "../enum";
import { Util } from "../util";
import { ParkingLot, Driver, DriverBroker, Vehicle, VehicleBroker } from "./";

export class App {
    private parking_lot: ParkingLot

    constructor() { }

    public createParkingLot(capacity: number) {
        this.parking_lot = ParkingLot.getInstance(capacity)
    }

    public process(next_commands: string[][]) {
        for (let i = 0; i < next_commands.length; i++) {
            const command = next_commands[i] || [],
                [action] = command

            let reg_number: string, driver_age: string, slot_number: string, _: any

            switch (action as EAction) {
                case EAction.PARK:
                    [_, reg_number = '', _, driver_age = ''] = command
                    reg_number = Util.cleanRegNumber(reg_number)
                    this.parking_lot.park(this.getVehicle(reg_number, driver_age))
                    break;
                case EAction.LEAVE:
                    [_, slot_number = ''] = command
                    this.parking_lot.leave(parseInt(slot_number))
                    break;
                case EAction.SLOT_NUMBER_FOR_DRIVER_OF_AGE:
                    [_, driver_age = ''] = command
                    this.parking_lot.getSlotNumberForDriverOfAge(parseInt(driver_age))
                    break;
                case EAction.SLOT_NUMBER_FOR_CAR_WITH_NUMBER:
                    [_, reg_number = ''] = command
                    reg_number = Util.cleanRegNumber(reg_number)
                    this.parking_lot.getSlotNumberForCarWithNumber(reg_number)
                    break;
                case EAction.VEHICLE_REGISTRATION_NUMBER_FOR_DRIVER_OF_AGE:
                    [_, driver_age = ''] = command
                    this.parking_lot.getVehicleRegistrationNumberForDriverOfAge(parseInt(driver_age))
                    break;
                default:
                    console.log(`Hmm... \n It looks like you owe me a pre-defined command.\n`)
                    break;
            }
        }
    }

    private getDriver(age: number): Driver {
        return DriverBroker.getDriver(age)
    }

    private getVehicle(reg_number: string, age: string): Vehicle {
        const driver = this.getDriver(parseInt(age))
        reg_number = Util.cleanRegNumber(reg_number)
        return VehicleBroker.getVehicleByRegistrationNumber(reg_number, driver)
    }
}