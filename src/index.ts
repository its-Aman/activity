import { normalize } from "path"
import { readFileSync } from 'fs'
import { argv, platform, exit } from "process"
import { Logging } from './util'
import { App } from './classes/App'

export class Main {
    constructor() { }

    public init(): void {
        this.checkLogging()

        let [filePath = ''] = argv.slice(2)
        filePath = normalize(filePath)

        if (!filePath) {
            console.log(`No filepath provided!\n exiting...`)
            exit(0)
        }

        try {
            const file = readFileSync(filePath as string, 'utf8'),
                lines = file.split('\n'),
                create_parking_lot_command = lines.shift() as string,
                next_commands = lines.map(line => line.split(' '))

            const app = new App(),
                parking_capacity = this.getParkingCapacity(create_parking_lot_command)

            app.createParkingLot(parking_capacity)
            app.process(next_commands)
        } catch (error) {
            console.log(`It seems like something isn't correct with the file or filepath isn't correct.`)
            this.printPlatform()
        }
    }

    private checkLogging(): void {
        let [IS_LOCAL = ''] = argv.slice(3)
        Logging.IS_LOCAL = IS_LOCAL == 'true'
    }

    private getParkingCapacity(command: string): number {
        const [_, capacity = '0'] = command.split(' ')
        return parseInt(capacity)
    }

    private printPlatform(): void {
        const op = [`You're running on`]
        switch (platform) {
            case 'aix':
                op.push("IBM AIX platform.")
                break
            case 'darwin':
                op.push("Darwin platform(MacOS, IOS etc).")
                break
            case 'freebsd':
                op.push("FreeBSD Platform.")
                break
            case 'linux':
                op.push("Linux Platform.")
                break
            case 'openbsd':
                op.push("OpenBSD platform.")
                break
            case 'sunos':
                op.push("SunOS platform.")
                break
            case 'win32':
                op.push("windows platform.")
                break
            default:
                op.push("unknown platform.")
        }
        op.push(`\nPlease enter the filepath accordingly.`)
        console.log(op.join(' '), '\n')
    }
}

const main = new Main()
main.init()