import {Component, Input, OnInit} from '@angular/core';
import {CurrentRoomSettingsService} from '../../services/current-room-settings.service';
import {LocalDeviceDataService} from '../../services/local-device-data.service';
import LanguageFile from "../../../assets/LanguageFile";

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
  constructor(public setting : CurrentRoomSettingsService, public data: LocalDeviceDataService) {
    this.setDate();
  }

  persons = LanguageFile[localStorage.getItem('Language')]['freemeetingrooms.persons'];

  changeLanguage(language:string){
    console.log(language);
    localStorage.setItem("Language", language)
    window.location.reload();
  }

  ngOnInit() {
  }
  private setDate() : void{
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

}
