import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-occupied',
  templateUrl: './occupied.component.html',
  styleUrls: ['./occupied.component.css']
})
export class OccupiedComponent implements OnInit {

  constructor() { }

  @Input() until : Date;
  @Input() title : String;
  @Output() end = new EventEmitter();
  ngOnInit() {
  }

}
