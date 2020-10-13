import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AircraftService } from '../service/aircraft-service.service';
import { Aircraft } from '../model/aircraft/aircraft';
import { UpdateAircraftRequest } from '../model/aircraft/update-aircraft-request';


@Component({
  selector: 'app-aircraft-edit',
  templateUrl: './aircraft-edit.component.html',
  styleUrls: ['./aircraft-edit.component.css']
})
export class AircraftEditComponent implements OnInit {

  currentAircraft: Aircraft;
  id: number;
  fromDB: Aircraft;
  update: UpdateAircraftRequest;

  constructor(private router: Router,
    private aircraftService: AircraftService) {
    this.update = new UpdateAircraftRequest();
  }

  ngOnInit(): void {
    
    this.aircraftService.currentAircraft.subscribe(
      currentAircraft => this.currentAircraft = currentAircraft
    );

    this.id = this.currentAircraft.dto_id;
  }


  onSubmit() {
    
    this.aircraftService
      .update(this.id, this.update)
      .subscribe(() => this.gotoAircraftList());
  }

  gotoAircraftList() {
    this.router.navigate(['/aircrafts']);
  }


}
