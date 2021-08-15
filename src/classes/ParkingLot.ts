import { EAction } from "../enum"
import { IParkingLot, IParkingSpot, IVehicle } from "../interfaces"
import { Messages, Logging } from "../util"
import { ResponseMessage, ParkingSpot, _ParkingLot } from "./"

export class ParkingLot extends _ParkingLot implements IParkingLot {
    private static _lot: ParkingLot
    private _capacity: number
    private _vehicle_count: number
    private _parkingSpots: Array<IParkingSpot>

    public static get lot(): ParkingLot {
        return ParkingLot._lot
    }

    public static set lot(value: ParkingLot) {
        ParkingLot._lot = value
    }

    private get capacity(): number {
        return this._capacity
    }

    private set capacity(value: number) {
        this._capacity = value
    }

    public get vehicle_count(): number {
        return this._vehicle_count
    }

    public set vehicle_count(value: number) {
        this._vehicle_count = value
    }

    public get parkingSpots(): Array<IParkingSpot> {
        return this._parkingSpots
    }

    public set parkingSpots(value: Array<IParkingSpot>) {
        this._parkingSpots = value
    }

    private constructor(capacity: number) {
        super()
        this.capacity = capacity
        this.vehicle_count = 0
        this.parkingSpots = []

        for (let i = 1; i <= capacity; i++)
            this.parkingSpots.push(new ParkingSpot(i, true))
    }

    public static getInstance(capacity: number): ParkingLot {
        if (ParkingLot.lot == null)
            ParkingLot.lot = new ParkingLot(capacity)

        ResponseMessage.send(EAction.CREATE_PARKING_LOT, { capacity })
        return ParkingLot.lot
    }

    public park(vehicle: IVehicle): void {
        Logging.log({ name: 'park', vehicle })

        if (this.isFull()) {
            Logging.print(Messages.PARKING_IS_FULL)
            return
        }

        for (let i = 0; i < this.parkingSpots.length; i++) {
            const spot = this.parkingSpots[i]
            if (spot?.isFree) {
                this.vehicle_count++
                spot.isFree = false
                spot.vehicle = vehicle
                ResponseMessage.send(EAction.PARK, { registration_number: vehicle.registration_number, spot_number: spot.number })
                break
            }
        }
    }

    public leave(spot_number: number): void {
        Logging.log({ name: 'leave', spot_number })

        const spot = this.parkingSpots.find(({ number }) => number == spot_number) as IParkingSpot

        if (!spot || spot.isFree) {
            Logging.print(Messages.NO_VEHICLE_FOUND)
            return
        }

        this.vehicle_count--
        const { vehicle } = spot
        spot.vehicle = null
        spot.isFree = true

        ResponseMessage.send(EAction.LEAVE, { spot_number, registration_number: vehicle?.registration_number, age: vehicle?.driver.age })
    }

    public getSlotNumberForDriverOfAge(driver_age: number): void {
        Logging.log({ name: 'getSlotNumberForDriverOfAge', driver_age })

        const spots = this.getOccupiedSpots()
        const spot_numbers: number[] = []

        spots.forEach((spot) => {
            if (spot) {
                if (spot?.vehicle?.driver?.age == driver_age)
                    spot_numbers.push(spot?.number)
            }
        })

        Logging.log({ spot_numbers })
        ResponseMessage.send(EAction.QUERY, { spot_numbers })
    }

    public getSlotNumberForCarWithNumber(reg_number: string): void {
        Logging.log({ name: 'getSlotNumberForCarWithNumber', reg_number })

        const spots = this.getOccupiedSpots()
        const spot_numbers: number[] = []

        spots.forEach((spot) => {
            if (spot) {
                if (reg_number == spot?.vehicle?.registration_number)
                    spot_numbers.push(spot?.number)
            }
        })

        Logging.log({ spot_numbers })
        ResponseMessage.send(EAction.QUERY, { spot_numbers })
    }

    public getVehicleRegistrationNumberForDriverOfAge(driver_age: number): void {
        Logging.log({ name: 'getVehicleRegistrationNumberForDriverOfAge', driver_age })

        const spots = this.getOccupiedSpots()
        const spot_numbers: string[] = []

        spots.forEach((spot) => {
            if (spot) {
                if (spot?.vehicle?.driver.age == driver_age)
                    spot_numbers.push(spot?.vehicle?.registration_number)
            }
        })

        Logging.log({ spot_numbers })
        ResponseMessage.send(EAction.QUERY, { spot_numbers })
    }

    private isFull(): boolean {
        return this.vehicle_count == this.capacity
    }

    private getOccupiedSpots(): IParkingSpot[] {
        return this.parkingSpots
            .filter(spot => !spot.isFree)
            .slice(0)
    }
}