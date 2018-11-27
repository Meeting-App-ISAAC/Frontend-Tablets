import {Component, Input, OnInit} from '@angular/core';
import {CurrentRoomSettingsService} from '../../services/current-room-settings.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  public currentDate : Date = new Date();
  @Input() backgroundColor : string = "red";
  @Input() showName : boolean = true;
  @Input() textColor : string = "white";
  constructor(public setting : CurrentRoomSettingsService) {
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
