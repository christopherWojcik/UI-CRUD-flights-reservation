import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightServiceService } from '../service/flight-service.service';
import { FlightSearchParam } from '../model/flight/flight-search-param';
import { Flight } from '../model/flight/flight';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  searchFlag: boolean = false;
  showHideMessage: string = 'Show flights ＼( °□° )／ !!!';

  flightSearch: FlightSearchParam;
  flights: Flight[];
  airports: string[];
  destinations: string[];

  currentFlight: Flight;
 

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private flightService: FlightServiceService) { 
      this.flightSearch = new FlightSearchParam();
    }

  ngOnInit(): void {
    this.flightService.getAirports().subscribe(data => {
      this.airports = data;
      this.destinations = data;
    });
    
    this.flightService.currentFlight.subscribe(
      curr => {this.currentFlight = curr;}
    );
  }

  onSubmit(){
    this.flightService.searchByParam(this.flightSearch).subscribe(
      data => {
        this.flights = data;
      }
    );
    this.searchFlag = !this.searchFlag;

    if (this.searchFlag == true) {
      this.showHideMessage = 'Hide flights ¯\\_(ツ)_/¯';
    } else {
      this.showHideMessage = 'Show flights ＼( °□° )／ !!!';
    }
  }

  getDestinations(airport: string){
    this.flightService.getDestinationsByAirport(airport).subscribe(
      data => {
        this.destinations = data;
      }
    )
  };


  reserveTicket(id: number, airport: string, destination: string, flightDate: string,
    flightDeparture: string, flightArrival: string, flightAirCraft: string){
    this.currentFlight = new Flight;
    this.currentFlight.dto_id = id;
    this.currentFlight.airport = airport;
    this.currentFlight.destination = destination;
    this.currentFlight.flightDate = flightDate;
    this.currentFlight.flightDeparture = flightDeparture;
    this.currentFlight.flightArrival = flightArrival;
    this.currentFlight.flightAirCraft = flightAirCraft;
    this.flightService.changeCurrentFlight(this.currentFlight);

    this.router.navigate(['/reservation']);  }

}
