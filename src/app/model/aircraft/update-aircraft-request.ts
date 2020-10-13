import { Flight } from '../flight/flight';

export class UpdateAircraftRequest {

    id: number;
    aircraftNumber: string;
    capacity: number;
    operable: boolean;
    flightLists: Flight[];

}
