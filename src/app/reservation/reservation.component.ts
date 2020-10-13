import { Component, OnInit } from '@angular/core';
import { FlightServiceService } from '../service/flight-service.service';
import { Flight } from '../model/flight/flight';
import { Reservation } from '../model/reservation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  currentFLight: Flight;
  reservation: Reservation;
  email: String;

  constructor(
    private router: Router, 
    private flightService: FlightServiceService) { }

  ngOnInit(): void {
      this.flightService.currentFlight.subscribe(
        data => {
          this.currentFLight = data;
        }
      );
      this.reservation = new Reservation;
      this.reservation.flight_id = this.currentFLight.dto_id;
      this.reservation.airport = this.currentFLight.airport;
      this.reservation.destination = this.currentFLight.destination;
      this.reservation.flightDate = this.currentFLight.flightDate;
      this.reservation.flightDeparture = this.currentFLight.flightDeparture;
      this.reservation.flightArrival = this.currentFLight.flightArrival;
      this.reservation.flightAirCraft = this.currentFLight.flightAirCraft;
      
  }

  onSubmit(){
    this.reservation.email = this.reservation.email;
  
    this.flightService.sendReservation(this.reservation).subscribe();
    this.router.navigate(['/success']);
  }

}
