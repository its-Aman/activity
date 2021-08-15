"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('test index.ts file', function () {
    var main;
    beforeAll(function () {
        main = new src_1.Main();
    });
    test('it should check if filepath is missing', function () {
        var logSpy = jest.spyOn(console, 'log').mockImplementation();
        main.init();
        expect(logSpy).toHaveBeenCalled();
    });
    test('it should check if filepath is not correct', function () {
        process.argv.push("abcinput.txt");
        var logSpy = jest.spyOn(console, 'log').mockImplementation();
        main.init();
        expect(logSpy).toHaveBeenCalled();
    });
    test('it should read the input file successfully, create parking lot and processes next commands', function () {
        process.argv.push("input.txt");
        var logSpy = jest.spyOn(console, 'log').mockImplementation();
        var createParkingLotSpy = jest.fn().mockImplementation();
        var processSpy = jest.fn().mockImplementation();
        jest.mock('../classes/App', function () {
            return jest.fn().mockImplementation(function () {
                return {
                    createParkingLot: createParkingLotSpy,
                    process: processSpy,
                };
            });
        });
        main.init();
        expect(logSpy).toHaveBeenCalled();
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=index.spec.js.map