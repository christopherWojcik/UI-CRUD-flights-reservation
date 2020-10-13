import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Aircraft } from '../model/aircraft/aircraft'
import { Observable, BehaviorSubject } from 'rxjs';
import { AircraftSearchParam } from '../model/aircraft/aircraft-search-param';
import { UpdateAircraftRequest } from '../model/aircraft/update-aircraft-request';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  private currentAircraftSource = new BehaviorSubject<Aircraft>(new Aircraft);
  currentAircraft = this.currentAircraftSource.asObservable();

  private aircraftSearchList: Aircraft[];
  private currentAircraftSearchSource = new BehaviorSubject<Aircraft[]>(this.aircraftSearchList);
  currentAircraftSearchList = this.currentAircraftSearchSource.asObservable();


  private aircraftsUrl: string;
  private aircraftsSearchUrl: string;
  private aircraftsUpdateUrl: string;

  constructor(private http: HttpClient) {
    this.aircraftsUrl = 'http://localhost:8080/api/aircrafts/';
    this.aircraftsSearchUrl = 'http://localhost:8080/api/aircrafts/specification';
    this.aircraftsUpdateUrl = 'http://localhost:8080/api/aircrafts/update';
  }

  //           SUBSCRIBE SECTION
  public changeCurrentAircraft(aircraft: Aircraft) {
    this.currentAircraftSource.next(aircraft);
  }

  public changeCurrentAirecraftList(search: Aircraft[]) {
    this.currentAircraftSearchSource.next(search);
  }

  //          CREATE SECTION
  public save(aircraft: Aircraft) {
    return this.http.post<Aircraft>(this.aircraftsUrl, aircraft);
  }

  //          READ SECTION
  public findAll(): Observable<Aircraft[]> {
    return this.http.get<Aircraft[]>(this.aircraftsUrl);
  }

  public getAircraftById(id: number): Observable<Object> {
    return this.http.get(`${this.aircraftsUrl}/id/${id}`);
  }

  public search(aircraftSearchParam: AircraftSearchParam): Observable<Aircraft[]> {
    return this.http.post<Aircraft[]>(this.aircraftsSearchUrl, aircraftSearchParam);
  }

  //          UPDATE SECTION
  public update(id: number, value: any): Observable<Object> {
    return this.http.put<UpdateAircraftRequest>(`${this.aircraftsUpdateUrl}/${id}`, value);
  }

  //          DELETE SECTION
  public deleteAircraft(id: number): Observable<any> {
    return this.http.delete(`${this.aircraftsUrl}/${id}`, { responseType: 'text' });
  }

}
