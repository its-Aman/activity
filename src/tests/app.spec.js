"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("../classes");
describe('test app.ts file', function () {
    var app;
    beforeEach(function () {
        app = new classes_1.App();
    });
    test('it should create a parking lot of 6 slots', function () {
        var parkingLotSpy = jest.spyOn(classes_1.ParkingLot, 'getInstance').mockImplementation();
        app.createParkingLot(6);
        expect(parkingLotSpy).toHaveBeenCalled();
        parkingLotSpy.mockClear();
    });
    test('it should process a park command when the slot is available', function () {
        var parkSpy = jest.fn().mockImplementation();
        jest.mock('../classes/parkingLot', function spy() {
            return jest.fn().mockImplementation(function () {
                return {
                    park: parkSpy
                };
            });
        });
        app.createParkingLot(6);
        app.process(["Park KA-01-HH-1234 driver_age 21".split(' ')]);
        expect(parkSpy).toHaveBeenCalled();
    });
});
//# sourceMappingURL=app.spec.js.map