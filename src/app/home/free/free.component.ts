import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit, OnChanges {
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes.until){
      this.setShowButton();
    }
  }

  @Input() until : Date;
  @Output() reservationEvent = new EventEmitter();
  public showButton : boolean = true;
  constructor() { }

  public use() : void{
    this.reservationEvent.emit();
  }
  private setShowButton() : void{
    if(!this.until){
      this.showButton = true;
      return;
    }
    let copy = new Date(this.until.getTime() - 20*60000);
    this.showButton = copy > new Date();
  }
}
