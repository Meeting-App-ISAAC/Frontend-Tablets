import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeMeetingRoomComponent } from './free-meeting-room.component';

describe('FreeMeetingRoomComponent', () => {
  let component: FreeMeetingRoomComponent;
  let fixture: ComponentFixture<FreeMeetingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeMeetingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeMeetingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
