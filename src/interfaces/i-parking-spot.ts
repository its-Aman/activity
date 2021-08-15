import { IVehicle } from ".";
export interface IParkingSpot {
    number: number;
    isFree: boolean;
    vehicle: IVehicle | null;
}
