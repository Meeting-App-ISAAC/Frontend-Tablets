import {AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';
import {DurationButtonUser} from '../DurationButtonUser';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent extends DurationButtonUser  implements OnInit, OnChanges, AfterViewInit {

  public nameFoundError : boolean = false;

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

  public constructor(private rest: ReservationStatusRESTService) {
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
    console.log(this.myControl.value);

    this.nameFoundError = this.getUserId() == -1;
    if(!this.nameFoundError) {

      this.rest.createReservation(this.getUserId(), this.getMinutes());
      this.cancel();
    }
  }

  private getUserId(): number {

    for (var i = 0; i < this.original.length; i++) {
      if (this.original[i].name === this.myControl.value) {
        return this.original[i].id;
      }
    }
    return -1;
  }


  public cancel(): void {
    this.cancelEvent.emit();
  }


}
