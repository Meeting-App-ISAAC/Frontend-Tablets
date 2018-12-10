import { Component, OnInit } from '@angular/core';
import {LocalDeviceDataService} from '../services/local-device-data.service';
import {ReservationStatusRESTService} from '../services/reservation-status-rest.service';

@Component({
  selector: 'app-setup-screen',
  templateUrl: './setup-screen.component.html',
  styleUrls: ['./setup-screen.component.css']
})
export class SetupScreenComponent implements OnInit {


  public adminPass;
  public roomKey;
  public roomFault: boolean = false;
  public adminFault : boolean = false;
  constructor(private settings : LocalDeviceDataService, private http : ReservationStatusRESTService) { }

  ngOnInit() {
  }

  public connectAsRoom(){
    this.http.getRoomInfo(this.roomKey).subscribe(
      (val : any) => {
        this.roomFault = !!val.error;
        if(!this.roomFault){
          this.settings.key = val.secret;
          this.settings.id = val.id;
          this.settings.save();
          location.reload();
        }
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }
  public connectAsAdmin(){
    this.http.getAdminGranted(this.adminPass).subscribe(
      (val : any) => {
        this.adminFault = !!val.error;
        if(!this.adminFault){
          this.settings.key = this.adminPass;
          this.settings.id = -1;
          this.settings.showCalendar = false;
          this.settings.isAdmin = true;
          this.settings.save();
          location.reload();
        }
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }
}
