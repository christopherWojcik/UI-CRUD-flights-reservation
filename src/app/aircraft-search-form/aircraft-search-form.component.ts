import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AircraftService } from '../service/aircraft-service.service';
import { AircraftSearchParam } from '../model/aircraft/aircraft-search-param';
import { Aircraft } from '../model/aircraft/aircraft';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-aircraft-search-form',
  templateUrl: './aircraft-search-form.component.html',
  styleUrls: ['./aircraft-search-form.component.css']
})
export class AircraftSearchFormComponent {

  aircraftSearchParam: AircraftSearchParam;
  currentAircraftList: Aircraft[];
  currentAircraft: Aircraft;

  showHideMessage: string  = 'Show aircrafts ＼( °□° )／ !!!';

  searchFlag: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private aircraftService: AircraftService) {

    this.aircraftSearchParam = new AircraftSearchParam;
    this.currentAircraftList;
  }

  onSubmit() {
    this.aircraftService.currentAircraft.subscribe(
      currentAircraft => this.currentAircraft = currentAircraft
    );


    this.aircraftService.search(this.aircraftSearchParam).subscribe(
      data => {
        this.currentAircraftList = data;
        console.log(this.currentAircraftList);
      }
    );
    this.aircraftService.changeCurrentAirecraftList(this.currentAircraftList);

    this.searchFlag = !this.searchFlag;

    if (this.searchFlag == true) {
      this.showHideMessage = 'Hide aircrafts ¯\\_(ツ)_/¯';
    } else {
      this.showHideMessage = 'Show aircrafts ＼( °□° )／ !!!';
    }
  }


  deleteAircraft(id: number) {
    this.aircraftService.deleteAircraft(id)
      .subscribe(
        data => {
          console.log(data);
          this.aircraftService.findAll().subscribe(data => { })
        },
        error => console.log(error));
  }


  gotoEditForm(dto_id: number,
    aircraftNumber: string,
    capacity: number,
    operable: boolean) {
    this.currentAircraft = new Aircraft;
    this.currentAircraft.dto_id = dto_id;
    this.currentAircraft.aircraftNumber = aircraftNumber;
    this.currentAircraft.capacity = capacity;
    this.currentAircraft.operable = operable;

    this.aircraftService.changeCurrentAircraft(this.currentAircraft)
    this.router.navigate(['/editaircraft']);
  }



}
