import { Component } from '@angular/core';
import {LocalDeviceDataService} from './services/local-device-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public settings : LocalDeviceDataService){
  }
}
