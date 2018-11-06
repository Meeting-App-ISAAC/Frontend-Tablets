import {Component, OnInit} from '@angular/core';
import {WebsocketConnectorService} from '../services/websocket-connector.service';
import { ReservationModel} from '../interfaces/ReservationModel';
import {ReservationStatusRESTService} from '../services/reservation-status-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public numbers: number[];
  public reservations: ReservationModel[] = [];
  public isOccupied : boolean = false;
  constructor(private websocket :  WebsocketConnectorService, private rest : ReservationStatusRESTService) {
    this.numbers = (new Array(24)).fill(0).map((x, i) => i);
    websocket.reservationUpdate.subscribe( data => {
      console.log(data);
      this.reservations = data;
    })
  }

  public get nextReservation() : ReservationModel{
    return this.reservations.find(x => x.startHour >  HomeComponent.caluculateDoubleHours());
  }
  public get nextReservationDate() : Date{
    const res = this.nextReservation;
    if(res === undefined){
      return null;
    }
    let result = new Date();
    result.setHours(0, 0, res.startHour * 60 * 60, 0);
    return result;
  }

  public get isReserved() : boolean{
    if(this.currentReservation === null){
      this.isOccupied = false;
    }
    return this.currentReservation !== undefined;
  }

  public setOccupied(){
    this.rest.sendReservationStarted(this.currentReservation);
    this.isOccupied = true;
  }

  public endCurrentReservation(){
    this.rest.sendReservationEnded(this.currentReservation);
  }

  private static caluculateDoubleHours() : number{
    return new Date().getHours() + new Date().getMinutes() / 60 + new Date().getSeconds() / 3600;
  }

  public get currentReservation() : ReservationModel{
    return this.reservations.find(x => x.startHour <= HomeComponent.caluculateDoubleHours() && x.startHour + x.length > HomeComponent.caluculateDoubleHours());
  }

  public get getReservationUntil() : Date{
    const res = this.currentReservation;
    if(res === undefined){
      return new Date();
    }
    let result = new Date();
    result.setHours(0, 0, (res.startHour+ res.length) * 60 * 60, 0);
    return result;
  }

  public get getReservationTitle() : String{
    const res = this.currentReservation;
    if(res === undefined){
      return "";
    }
    return res.title;
  }
  ngOnInit() {
  }

}

