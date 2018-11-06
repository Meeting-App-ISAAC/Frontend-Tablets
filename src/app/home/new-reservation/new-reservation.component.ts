import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/internal/operators';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {


  constructor() { }
  public timeButtonSelected : number = 0;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  public clickTimeButton(id : number): void{
    this.timeButtonSelected = id;
  }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', '4', '5','6 ','7,','8'];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public submit() : void{
    console.log(this.myControl.value);
  }

  public cancel() : void{

  }
}
