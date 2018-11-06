import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  public currentDate : Date;
  @Input() backgroundColor : string = "red";
  @Input() showName : boolean = true;
  @Input() timeColor : string = "white";
  constructor() {
    this.setDate();
  }

  ngOnInit() {
  }
  private setDate() : void{
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

}
