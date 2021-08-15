import { IParkingSpot, IVehicle } from "../interfaces"

export class ParkingSpot implements IParkingSpot {
    private _number: number
    private _isFree: boolean = false
    private _vehicle: IVehicle

    public get number(): number {
        return this._number
    }

    public set number(value: number) {
        this._number = value
    }

    public get isFree(): boolean {
        return this._isFree
    }

    public set isFree(value: boolean) {
        this._isFree = value
    }


    public get vehicle(): IVehicle {
        return this._vehicle
    }

    public set vehicle(value: IVehicle) {
        this._vehicle = value
    }

    constructor(slot_number?: number, isFree?: boolean, vehicle?: IVehicle) {
        if (slot_number)
            this._number = slot_number

        if (isFree != null || isFree != undefined)
            this._isFree = isFree

        if (vehicle)
            this._vehicle = vehicle
    }
}