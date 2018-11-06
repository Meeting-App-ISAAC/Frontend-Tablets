import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {


  public constructor(private rest: ReservationStatusRESTService) {
  }

  public timeButtonSelected: number = 0;
  private original;
  @Output() cancelEvent = new EventEmitter();

  ngOnInit() {
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

  public clickTimeButton(id: number): void {
    this.timeButtonSelected = id;
  }

  myControl = new FormControl();
  public options: any = [];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public submit(): void {
    console.log(this.myControl.value);

    this.rest.createReservation(this.getUserId(), this.getMinutes());
    this.cancel();
  }

  private getUserId(): number {

    for (var i = 0; i < this.original.length; i++) {
      if (this.original[i].name === this.myControl.value) {
        return this.original[i].id;
      }
    }
  }


  public cancel(): void {
    this.timeButtonSelected = 0;
    this.myControl.setValue("");
    this.cancelEvent.emit();
  }

  private getMinutes(): number {
    switch (this.timeButtonSelected) {
      case 0:
        return 15;
      case 1:
        return 30;
      case 2:
        return 45;
      case 3:
        return 60;
    }
  }
}
