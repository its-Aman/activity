import { Main } from ".."

describe('test index.ts file', () => {
    let main: Main

    beforeAll(() => {
        main = new Main()
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('it should check if filepath is missing', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation()
        main.init()

        expect(logSpy).toHaveBeenCalled()
    })

    test('it should check if filepath is not correct', () => {
        process.argv.push(`\abc\input.txt`)
        const logSpy = jest.spyOn(console, 'log').mockImplementation()
        main.init()

        expect(logSpy).toHaveBeenCalled()
    })

    test('it should read the input file successfully, create parking lot and processes next commands', () => {
        process.argv.push(`input.txt`)
        const logSpy = jest.spyOn(console, 'log').mockImplementation()
        const createParkingLotSpy = jest.fn().mockImplementation()
        const processSpy = jest.fn().mockImplementation()

        jest.mock('../classes/App', () => {
            return {
                App: jest.fn().mockImplementation(() => {
                    return {
                        createParkingLot: createParkingLotSpy,
                        process: processSpy,
                    }
                })
            }
        })

        main.init()
        expect(logSpy).toHaveBeenCalled()
    })
})
