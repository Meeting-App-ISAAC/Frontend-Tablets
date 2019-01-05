import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';
import {DurationButtonUser} from '../DurationButtonUser';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material';
import {CurrentRoomSettingsService} from '../../services/current-room-settings.service';
import {LocalDeviceDataService} from '../../services/local-device-data.service';
import LanguageFile from "../../../assets/LanguageFile";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent extends DurationButtonUser  implements OnInit, OnChanges, AfterViewInit {

  reserve = LanguageFile[localStorage.getItem('Language')]['newreservation.title'];
  newreservationlength = LanguageFile[localStorage.getItem('Language')]['newreservation.length'];
  newreservationwho = LanguageFile[localStorage.getItem('Language')]['newreservation.who'];
  newreservationerrortime = LanguageFile[localStorage.getItem('Language')]['newreservation.error.time'];
  newreservationerrorname = LanguageFile[localStorage.getItem('Language')]['newreservation.error.name'];
  startmeeting = LanguageFile[localStorage.getItem('Language')]['general.startmeeting'];
  generalcancel = LanguageFile[localStorage.getItem('Language')]['general.cancel'];

  public nameFoundError : boolean = false;
  public nameSelectedId : number = -1;

  public original : any[] = [];
  @Output() cancelEvent = new EventEmitter();

  @Input() roomSelectedId;
  public ngAfterViewInit(): void {
    this.original = [];
    this.nameSelectedId = -1;
    this.nameFoundError = false;
    this.resetTimer();
    this.timeButtonSelected = 0;
    this.data.showCalendar = true;
    setTimeout(() => this.populateWithNames(),1);
  }

  private timeoutTimer;
  public resetTimer() : void{
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = setTimeout(() => this.cancel(), 1000 * 60 * 5);
  }

  public constructor(private rest: ReservationStatusRESTService, public setting : CurrentRoomSettingsService, public data : LocalDeviceDataService) {
    super();
  }



  private populateWithNames() : void{
    this.rest.getUsers().subscribe(
      (val : any) => {
        this.original = val;
      },
      response => {
      },
      () => {
      });
  }



  ngOnInit() {
    super.ngOnInit();
  }

  public inputChange(select : any) : void{
    this.nameFoundError = false;
    this.nameSelectedId = select.id;
  }




  public submit(): void {

    this.nameFoundError = this.getUserId() == -1;
    if(!this.nameFoundError) {

      console.log(this.roomSelectedId);
      this.rest.createReservation(this.getUserId(), this.getMinutes(), this.roomSelectedId);
      this.cancel();
    }
  }

  private getUserId(): number {
    return this.nameSelectedId;
  }


  public cancel(): void {
    this.cancelEvent.emit();
  }


}
