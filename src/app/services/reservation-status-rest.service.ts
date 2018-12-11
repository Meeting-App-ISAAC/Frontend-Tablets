import { Injectable } from '@angular/core';
import {ReservationModel} from '../interfaces/ReservationModel';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalDeviceDataService} from './local-device-data.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationStatusRESTService {

  public constructor(private settings : LocalDeviceDataService, private http : HttpClient){}
  private  getHttpOptions() : any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization" : 'basic ' + this.settings.key
      })
    };
    return httpOptions;
  }
  public sendReservationStarted(reservation : ReservationModel) : void {
    console.log("SEND");
    const data = {"roomId" : this.settings.id, "reservationId" : reservation.id};
    const httpOptions = this.getHttpOptions();
    this.http.post("http://"+location.hostname+":8090/api/start", JSON.stringify(data) ,httpOptions).subscribe(
      (val) => {
        //POST call successful value returned in body
        //this.result = val.toString();
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }

  public sendReservationEnded(reservation : ReservationModel) {
    const data = {"roomId" : this.settings.id, "reservationId" : reservation.id};
    const httpOptions = this.getHttpOptions();
    this.http.post("http://"+location.hostname+":8090/api/stop", JSON.stringify(data) ,httpOptions).subscribe(
      (val) => {
        //POST call successful value returned in body
        //this.result = val.toString();
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }

  public createReservation(userId : number, duration : number, roomId: number) {
    const data = {"roomId" : roomId, "userId" : userId, "duration" : duration};
    const httpOptions = this.getHttpOptions();
    this.http.post("http://"+location.hostname+":8090/api/create", JSON.stringify(data) ,httpOptions).subscribe(
      (val) => {
        //POST call successful value returned in body
        //this.result = val.toString();
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }
  public sendReservationExtend(reservation : ReservationModel, minutes : number) : Observable<object>{
    debugger;
    const data = {"roomId" : this.settings.id, "reservationId" : reservation.id, minutes : minutes};
    const httpOptions = this.getHttpOptions();
    let post = this.http.post("http://"+location.hostname+":8090/api/extend", JSON.stringify(data) ,httpOptions);
    return post;
  }

  public getUsers() : Observable<object>{
    const httpOptions = this.getHttpOptions();
    return this.http.get("http://"+location.hostname+":8090/api/users", httpOptions);
  }

  public getRoomsMetaData() : Observable<object>{
    const httpOptions = this.getHttpOptions();
    return this.http.get("http://"+location.hostname+":8090/config/rooms", httpOptions);
  }
  public getRoomInfo(key: String) : Observable<object>{
    const httpOptions = this.getHttpOptions();
    return this.http.get("http://"+location.hostname+":8090/config/roomInfo?key="+key, httpOptions);
  }

  public getAdminGranted(pass: String) : Observable<object>{
    const httpOptions = this.getHttpOptions();
    return this.http.get("http://"+location.hostname+":8090/config/adminInfo?pass="+pass, httpOptions);
  }

}
