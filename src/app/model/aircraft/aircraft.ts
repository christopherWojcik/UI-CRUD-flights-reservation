import { Flight } from '../flight/flight'

export class Aircraft {

    dto_id: number;
    aircraftNumber: string;
    capacity: number;
    operable: boolean;
    flightList: Flight[];

    ngOnInit(){
        
    }
}
