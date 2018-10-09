import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public numbers: number[];
  public reservations: any;
  constructor() {
    this.numbers = (new Array(24)).fill(0).map((x,i)=>i);
    this.reservations = [
      {
        "title" : "Alex van Diepen",
        "startHour" : 19,
        "length" : 2
      },
      {
        "title" : "Thobias van Diepen",
        "startHour" : 11,
        "length" : 2
      },
    ]
  }

  ngOnInit() {
  }

}
