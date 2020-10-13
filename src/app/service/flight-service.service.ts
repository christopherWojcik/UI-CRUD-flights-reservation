import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../model/flight/flight';
import { Observable, BehaviorSubject } from 'rxjs';
import { FlightSearchParam } from '../model/flight/flight-search-param';
import { Aircraft } from '../model/aircraft/aircraft';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class FlightServiceService {

  private flightsUrl: string;
  private airportsUrl: string;
  private searchUrl: string;
  private reservationUrl: string;
  private airportsByDestination: string;
  private flightsByAirportId: string;
  

  private currentFlightSource = new BehaviorSubject<Flight>(new Flight);
  currentFlight = this.currentFlightSource.asObservable();


  constructor(private http: HttpClient) {
    this.flightsUrl = 'http://localhost:8080/api/flights';
    this.airportsUrl = this.flightsUrl + '/airports';
    this.searchUrl = this.flightsUrl + '/specification';
    this.reservationUrl = this.flightsUrl + '/reservation';
    this.airportsByDestination = this.flightsUrl + '/airport';
    this.flightsByAirportId = `${this.flightsUrl}/searchbyaircraft`;
  }

  public changeCurrentFlight(flight: Flight) {
    this.currentFlightSource.next(flight);
  }

  public findAll() {
    return this.http.get<Flight[]>(this.flightsUrl);
  }

  public searchByParam(param: FlightSearchParam): Observable<Flight[]> {
    return this.http.post<Flight[]>(this.searchUrl, param);
  }

  public save(flight: Flight) {
    return this.http.post<Flight>(this.flightsUrl, flight);
  }

  public getAirports(){
    return this.http.get<string[]>(this.airportsUrl);
  }

  public sendReservation(reservation: Reservation){
    return this.http.post<Reservation>(this.reservationUrl, reservation);
  }

  public getDestinationsByAirport(airport: string): Observable<string[]>{
    return this.http.get<string[]>(`${this.airportsByDestination}/${airport}`)
  }

  public getFlightsByAircraftId(id: number) {
    return this.http.get<Flight[]>(`${this.flightsByAirportId}/${id}`);
  }
  
}
