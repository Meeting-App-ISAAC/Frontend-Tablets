import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit {
  @Input() until : Date;
  @Output() reservationEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public use() : void{
    this.reservationEvent.emit();
  }
}
