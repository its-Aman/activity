import { EAction } from "../enum"
import { IResponseMessagePayload } from "../interfaces";
import { Messages, Logging } from "../util";

export class ResponseMessage {
    constructor() { }

    public static send(type: EAction, payload: IResponseMessagePayload) {
        switch (type) {
            case EAction.CREATE_PARKING_LOT:
                ResponseMessage.creatingParkingLot(payload)
                break;
            case EAction.PARK:
                ResponseMessage.park(payload)
                break;
            case EAction.LEAVE:
                ResponseMessage.leave(payload)
                break;
            case EAction.QUERY:
                ResponseMessage.query(payload)
                break;
        }
    }

    private static creatingParkingLot({ capacity }: IResponseMessagePayload) {
        const message = `Created parking of ${capacity} slots.\n`
        Logging.print(message)
    }

    private static park({ registration_number, spot_number }: IResponseMessagePayload) {
        const message = `Car with vehicle registration number "${registration_number}" has been parked at slot number ${spot_number}.\n`
        Logging.print(message)
    }

    private static leave({ spot_number, registration_number, age }: IResponseMessagePayload) {
        const message = `Slot number ${spot_number} vacated, the car with vehicle registration number "${registration_number}" left the space, the driver of the car was of age ${age}.\n`
        Logging.print(message)
    }

    private static query({ spot_numbers }: IResponseMessagePayload) {
        let message = ``
        if (spot_numbers && spot_numbers.length) {
            message = (spot_numbers as number[]).join(', ') + '\n'
        } else {
            message = Messages.RESULT_IS_EMPTY
        }
        Logging.print(message)
    }
}