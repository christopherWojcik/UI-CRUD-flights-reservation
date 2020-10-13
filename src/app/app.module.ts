import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AircraftService } from './service/aircraft-service.service';
import { AppComponent } from './app.component';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { AircraftFormComponent } from './aircraft-form/aircraft-form.component';
import { AircraftSearchFormComponent } from './aircraft-search-form/aircraft-search-form.component';
import { AircraftSearchParam } from './model/aircraft/aircraft-search-param';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightServiceService } from './service/flight-service.service';
import { AircraftEditComponent } from './aircraft-edit/aircraft-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SuccessComponent } from './success/success.component';
import { FlightListComponent } from './flight-list/flight-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AircraftListComponent,
    AircraftFormComponent,
    AircraftSearchFormComponent,
    AircraftSearchFormComponent,
    AircraftEditComponent,
    FlightSearchComponent,
    ReservationComponent,
    SuccessComponent,
    FlightListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,  
    ReactiveFormsModule, 
    NgbModule,
  ],
  providers: [AircraftService, FlightServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
