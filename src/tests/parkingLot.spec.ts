import { Driver, ParkingLot, ResponseMessage, Vehicle } from "../classes"
import { Logging } from "../util"

describe('test parkingLot.ts file', () => {
    let parkingLot: ParkingLot

    beforeAll(() => {
        parkingLot = ParkingLot.getInstance(2)
    })

    beforeEach(() => {
        parkingLot.parkingSpots.forEach(spot => {
            spot.isFree = true
            spot.vehicle = null
        })
        parkingLot.vehicle_count = 0
    })

    test('it should create a single instance of Parking Lot', () => {
        expect(parkingLot.parkingSpots.length).toBe(2)
        expect(parkingLot.vehicle_count).toBe(0)
    })

    test('it should park a vehicle when spot is available', () => {
        const vehicle = new Vehicle('PB-01-HH-6789', new Driver(21)),
            responseMessageSendSpy = jest.spyOn(ResponseMessage, 'send').mockImplementation()

        parkingLot.park(vehicle)
        expect(parkingLot.parkingSpots[0]?.vehicle?.registration_number).toBe(vehicle.registration_number)
        expect(parkingLot.parkingSpots[0]?.isFree).toBeFalsy()
        expect(parkingLot.vehicle_count).toBe(1)
        expect(responseMessageSendSpy).toHaveBeenCalled()
    })

    test('it should park a vehicle when spot is not available', () => {
        const vehicle_first = new Vehicle('PB-01-HH-6789', new Driver(21)),
            vehicle_last = new Vehicle('PB-01-HD-5493', new Driver(24)),
            vehicle_next = new Vehicle('PB-01-HH-2341', new Driver(18)),
            loggingPrintSpy = jest.spyOn(Logging, 'print').mockImplementation()

        parkingLot.park(vehicle_first)
        parkingLot.park(vehicle_last)
        parkingLot.park(vehicle_next)

        expect(parkingLot.vehicle_count).toBe(2)
        expect(loggingPrintSpy).toHaveBeenCalled()
    })

    test('it should leave a vehicle when vehicle is available', () => {
        const vehicle = new Vehicle('PB-01-HH-6789', new Driver(21)),
            responseMessageSendSpy = jest.spyOn(ResponseMessage, 'send').mockImplementation()

        parkingLot.park(vehicle)
        parkingLot.leave(1)
        expect(parkingLot.parkingSpots[0]?.vehicle).toBe(null)
        expect(parkingLot.parkingSpots[0]?.isFree).toBeTruthy()
        expect(parkingLot.vehicle_count).toBe(0)
        expect(responseMessageSendSpy).toHaveBeenCalled()
    })

    test('it should leave a vehicle when vehicle is not available', () => {
        const loggingPrintSpy = jest.spyOn(Logging, 'print').mockImplementation()
        parkingLot.leave(1)
        expect(loggingPrintSpy).toHaveBeenCalled()
    })

    test('it should query for slot number for driver age', () => {
        const vehicle_first = new Vehicle('PB-01-HH-6789', new Driver(21)),
            vehicle_last = new Vehicle('PB-01-HD-5493', new Driver(24)),
            responseMessageSendSpy = jest.spyOn(ResponseMessage, 'send').mockImplementation()

        parkingLot.park(vehicle_first)
        parkingLot.park(vehicle_last)

        parkingLot.getSlotNumberForDriverOfAge(21)
        expect(responseMessageSendSpy).toHaveBeenCalled()
    })

    test('it should query for registration number for driver age', () => {
        const vehicle_first = new Vehicle('PB-01-HH-6789', new Driver(21)),
            vehicle_last = new Vehicle('PB-01-HD-5493', new Driver(24)),
            responseMessageSendSpy = jest.spyOn(ResponseMessage, 'send').mockImplementation()

        parkingLot.park(vehicle_first)
        parkingLot.park(vehicle_last)

        parkingLot.getVehicleRegistrationNumberForDriverOfAge(21)
        expect(responseMessageSendSpy).toHaveBeenCalled()
    })

    test('it should query for slot number for car with registration number', () => {
        const vehicle_first = new Vehicle('PB-01-HH-6789', new Driver(21)),
            vehicle_last = new Vehicle('PB-01-HD-5493', new Driver(24)),
            responseMessageSendSpy = jest.spyOn(ResponseMessage, 'send').mockImplementation()

        parkingLot.park(vehicle_first)
        parkingLot.park(vehicle_last)

        parkingLot.getSlotNumberForCarWithNumber('PB-01-HD-5493')
        expect(responseMessageSendSpy).toHaveBeenCalled()
    })
})