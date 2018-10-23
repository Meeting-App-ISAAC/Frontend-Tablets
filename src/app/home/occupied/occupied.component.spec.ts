import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupiedComponent } from './occupied.component';

describe('OccupiedComponent', () => {
  let component: OccupiedComponent;
  let fixture: ComponentFixture<OccupiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
