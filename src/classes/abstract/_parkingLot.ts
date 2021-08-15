import { IVehicle } from "../../interfaces";

export abstract class _ParkingLot {
    abstract park(vehicle: IVehicle): void
    abstract leave(spot_number: number): void
    abstract getSlotNumberForDriverOfAge(driver_age: number): void
    abstract getSlotNumberForCarWithNumber(reg_number: string): void
    abstract getVehicleRegistrationNumberForDriverOfAge(driver_age: number): void

}