import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aircraft } from '../model/aircraft/aircraft';
import { Flight } from '../model/flight/flight';
import { AircraftService } from '../service/aircraft-service.service';
import { FlightServiceService } from '../service/flight-service.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights: Flight[];
  currentFlight: Flight;
  currentAircraft: Aircraft;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private aircraftService: AircraftService,
    private flightService: FlightServiceService) { }

  ngOnInit(): void {
    this.flightService.currentFlight.subscribe(
      data => {
        this.currentFlight = data;
      });
      console.log(this.currentFlight);

      this.aircraftService.currentAircraft.subscribe(
        data => {
          this.currentAircraft = data;
        }
      )

    this.flightService.getFlightsByAircraftId(this.currentAircraft.dto_id).subscribe(
      data => {
        this.flights = data;
      });
      console.log('Current flight id: ' + this.currentFlight.dto_id);
      console.log(this.flights);
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
