import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {


  constructor() { }

  @Input() until : Date;
  @Input() title : String;

  @Output() start = new EventEmitter();
  public clicked() : void{
    this.start.emit();
  }
  ngOnInit() {
  }

}
