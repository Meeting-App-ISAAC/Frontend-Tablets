import { Injectable } from '@angular/core';
import {ReservationModel} from '../interfaces/ReservationModel';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationStatusRESTService {

  public sendReservationStarted(reservation : ReservationModel) : void {
    console.log("SEND");
    const data = {"roomId" : 1, "reservationId" : reservation.id};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
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
    debugger;
    const data = {"roomId" : 1, "reservationId" : reservation.id};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
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

  public createReservation(userId : number, duration : number) {
    const data = {"roomId" : 1, "userId" : userId, "duration" : duration};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
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
    const data = {"roomId" : 1, "reservationId" : reservation.id, minutes : minutes};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let post = this.http.post("http://"+location.hostname+":8090/api/extend", JSON.stringify(data) ,httpOptions)
    return post;
  }

  public getUsers() : Observable<object>{
    return this.http.get("http://"+location.hostname+":8090/api/users");
  }




  constructor(private http : HttpClient) { }
}
