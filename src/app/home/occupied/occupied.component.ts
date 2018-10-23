import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-occupied',
  templateUrl: './occupied.component.html',
  styleUrls: ['./occupied.component.css']
})
export class OccupiedComponent implements OnInit {

  constructor() { }

  @Input() until : Date;
  @Input() title : String;
  ngOnInit() {
  }

}
