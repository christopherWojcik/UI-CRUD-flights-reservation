import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftSearchFormComponent } from './aircraft-search-form.component';

describe('AircraftSearchFormComponent', () => {
  let component: AircraftSearchFormComponent;
  let fixture: ComponentFixture<AircraftSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
