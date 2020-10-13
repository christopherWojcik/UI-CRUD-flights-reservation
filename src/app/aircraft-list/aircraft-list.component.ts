import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aircraft } from '../model/aircraft/aircraft';
import { AircraftService } from '../service/aircraft-service.service';
import { UpdateAircraftRequest } from '../model/aircraft/update-aircraft-request';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../model/flight/flight';
import { FlightServiceService } from '../service/flight-service.service';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {

  isupdated: boolean = false;

  aircrafts: Aircraft[];
  flights: Flight[];

  currentAircraft: Aircraft;
  currentFlight: Flight;
  aircraftToUpdate: UpdateAircraftRequest;

  constructor(
    private router: Router,
    private aircraftService: AircraftService,
    private flightService: FlightServiceService) { }

  ngOnInit() {
    this.aircraftService.findAll().subscribe(data => { this.aircrafts = data });

    this.flightService.findAll().subscribe(data => { this.flights = data });

    this.aircraftService.currentAircraft.subscribe(currentAircraft => this.currentAircraft = currentAircraft);

    this.flightService.currentFlight.subscribe(currentFlight => { this.currentFlight = currentFlight; });
  }

  deleteAircraft(id: number) {
    this.aircraftService.deleteAircraft(id)
      .subscribe(
        data => {
          console.log(data);
          this.aircraftService.findAll().subscribe(data => {
            this.aircrafts = data  // update List after deletion
          })
        },
        error => console.log(error));
  }

  submitCurrentFlight(dto_id: number,
    aircraftNumber: string,
    capacity: number,
    operable: boolean) {
    this.currentAircraft = new Aircraft;
    this.currentAircraft.dto_id = dto_id;
    this.currentAircraft.aircraftNumber = aircraftNumber;
    this.currentAircraft.capacity = capacity;
    this.currentAircraft.operable = operable;
    this.aircraftService.changeCurrentAircraft(this.currentAircraft);
  }


  reserveTicket(id: number, airport: string, destination: string, flightDate: string,
    flightDeparture: string, flightArrival: string, flightAirCraft: string) {
    this.currentFlight = new Flight;
    this.currentFlight.dto_id = id;
    this.currentFlight.airport = airport;
    this.currentFlight.destination = destination;
    this.currentFlight.flightDate = flightDate;
    this.currentFlight.flightDeparture = flightDeparture;
    this.currentFlight.flightArrival = flightArrival;
    this.currentFlight.flightAirCraft = flightAirCraft;
    this.flightService.changeCurrentFlight(this.currentFlight);

    this.router.navigate(['/reservation']);
  }



}
