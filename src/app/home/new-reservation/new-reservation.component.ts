import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';
import {DurationButtonUser} from '../DurationButtonUser';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material';
import {CurrentRoomSettingsService} from '../../services/current-room-settings.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent extends DurationButtonUser  implements OnInit, OnChanges, AfterViewInit {

  public nameFoundError : boolean = false;
  @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger })
  public panel : MatAutocompleteTrigger;
  @Input() roomSelectedId;
  public ngAfterViewInit(): void {
    this.nameFoundError = false;
    this.resetTimer();
    this.timeButtonSelected = 0;
    this.myControl.setValue(null);
    setTimeout(() => this.populateWithNames(),1);
  }

  private timeoutTimer;
  public resetTimer() : void{
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = setTimeout(() => this.cancel(), 1000 * 60 * 5);
  }

  public constructor(private rest: ReservationStatusRESTService, public setting : CurrentRoomSettingsService) {
    super();
  }


  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if(this.timeButtonsFree < 0){
      this.myControl.disable();
    } else {
      this.myControl.enable();
    }
  }

  private populateWithNames() : void{
    this.rest.getUsers().subscribe(
      (val) => {
        this.original = val;
        for (var i = 0; i < this.original.length; i++) {
          this.options[i] = val[i].name;
        }
        setTimeout(() => {
          this.panel.openPanel();
          this.panel.panelClosingActions.subscribe( x => console.log(x) );
        }, 10);

      },
      response => {
      },
      () => {
      });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public reopenPanel() : void{
    setTimeout(() => this.panel.openPanel(), 1);

  }
  private original;
  @Output() cancelEvent = new EventEmitter();

  ngOnInit() {
    super.ngOnInit();
  }

  public inputChange() : void{
    this.nameFoundError = false;
  }


  myControl = new FormControl();
  public options: string[] = [];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

    for (let i = 0; i < this.original.length; i++) {
      if (this.original[i].name.trim() === this.myControl.value.trim()) {
        return this.original[i].id;
      }
    }
    return -1;
  }


  public cancel(): void {
    this.cancelEvent.emit();
  }


}
