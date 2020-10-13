import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aircraft } from '../model/aircraft/aircraft';
import { AircraftService } from '../service/aircraft-service.service';


@Component({
  selector: 'app-aircraft-form',
  templateUrl: './aircraft-form.component.html',
  styleUrls: ['./aircraft-form.component.css']
})
export class AircraftFormComponent {
 
  aircraft: Aircraft;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private aircraftService: AircraftService) {
    
    this.aircraft = new Aircraft();
  }

  onSubmit(){
    this.aircraftService.save(this.aircraft).subscribe(() => this.gotoAircraftList());
  }

  gotoAircraftList(){
    this.router.navigate(['/aircrafts']);
  }


}
