import { IParkingSpot } from "./i-parking-spot";
export interface IParkingLot {
    vehicle_count: number;
    parkingSpots: Array<IParkingSpot>;
}
