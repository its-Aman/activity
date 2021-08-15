import { App, ParkingLot } from "../classes";

describe(`test app.ts file`, () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test(`it should create a parking lot of 6 slots`, () => {
        const parkingLotSpy = jest.spyOn(ParkingLot, 'getInstance').mockImplementation()
        const app = new App()
        app.createParkingLot(6)
        expect(parkingLotSpy).toHaveBeenCalled()
        parkingLotSpy.mockClear()
    })

    test(`it should process a "park" command`, () => {
        const parkSpy = jest.fn().mockImplementation()
        jest
            .spyOn(ParkingLot, 'getInstance')
            .mockImplementation(() => ({
                park: parkSpy
            } as any)
            )

        const app = new App()
        app.createParkingLot(6)
        app.process([`Park KA-01-HH-1234 driver_age 21`.split(' ')])

        expect(parkSpy).toHaveBeenCalled()
    })

    test(`it should process a "leave" command`, () => {
        const leaveSpy = jest.fn().mockImplementation()
        jest
            .spyOn(ParkingLot, 'getInstance')
            .mockImplementation(() => ({
                leave: leaveSpy
            } as any)
            )

        const app = new App()
        app.createParkingLot(6)
        app.process([`Leave 1`.split(' ')])

        expect(leaveSpy).toHaveBeenCalled()
    })

    test(`it should process a "Slot numbers for driver of age" command`, () => {
        const getSlotNumberForDriverOfAgeSpy = jest.fn().mockImplementation()
        jest
            .spyOn(ParkingLot, 'getInstance')
            .mockImplementation(() => ({
                getSlotNumberForDriverOfAge: getSlotNumberForDriverOfAgeSpy
            } as any)
            )

        const app = new App()
        app.createParkingLot(6)
        app.process([`Slot_numbers_for_driver_of_age 21`.split(' ')])

        expect(getSlotNumberForDriverOfAgeSpy).toHaveBeenCalled()
    })

    test(`it should process a "Slot number for car with number" command`, () => {
        const getSlotNumberForCarWithNumberSpy = jest.fn().mockImplementation()
        jest
            .spyOn(ParkingLot, 'getInstance')
            .mockImplementation(() => ({
                getSlotNumberForCarWithNumber: getSlotNumberForCarWithNumberSpy
            } as any)
            )

        const app = new App()
        app.createParkingLot(6)
        app.process([`Slot_number_for_car_with_number PB-01-HH-6789`.split(' ')])

        expect(getSlotNumberForCarWithNumberSpy).toHaveBeenCalled()
    })

    test(`it should process a "Vehicle registration number for driver of age" command`, () => {
        const getVehicleRegistrationNumberForDriverOfAgeSpy = jest.fn().mockImplementation()
        jest
            .spyOn(ParkingLot, 'getInstance')
            .mockImplementation(() => ({
                getVehicleRegistrationNumberForDriverOfAge: getVehicleRegistrationNumberForDriverOfAgeSpy
            } as any)
            )

        const app = new App()
        app.createParkingLot(6)
        app.process([`Vehicle_registration_number_for_driver_of_age 21`.split(' ')])

        expect(getVehicleRegistrationNumberForDriverOfAgeSpy).toHaveBeenCalled()
    })

    test(`it should process a "unknown" command`, () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation()
        const app = new App()
        app.createParkingLot(6)
        app.process([`unknown PB-01-HH-6789`.split(' ')])

        expect(logSpy).toHaveBeenCalled()
    })
})
