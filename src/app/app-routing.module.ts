import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { AircraftFormComponent } from './aircraft-form/aircraft-form.component';
import { AircraftSearchFormComponent } from './aircraft-search-form/aircraft-search-form.component';
import { AircraftEditComponent } from './aircraft-edit/aircraft-edit.component'
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SuccessComponent } from './success/success.component';
import { FlightListComponent } from './flight-list/flight-list.component';


const routes: Routes = [
    { path: 'aircrafts', component: AircraftListComponent },
    { path: 'addaircraft', component: AircraftFormComponent},
    { path: 'searchaircrafts', component: AircraftSearchFormComponent},
    { path: 'editaircraft', component: AircraftEditComponent},
    { path: 'flightsearch', component: FlightSearchComponent},
    { path: 'reservation', component: ReservationComponent},
    { path: 'success', component: SuccessComponent},
    { path: 'flights', component: FlightListComponent}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
