import {Component, Input, OnInit} from '@angular/core';
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
  public roomId : number = 1;
  public localReservations: ReservationModel[] = [];
  public roomsCollection = [];
  public makeReservation: boolean = false;
  public currentDate : Date = new Date();
  @Input() backgroundColor : string = "red";
  @Input() showName : boolean = true;
  @Input() textColor : string = "white";

  private setDate() : void{
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
  constructor(public websocket :  WebsocketConnectorService, private rest : ReservationStatusRESTService) {
    this.numbers = (new Array(24)).fill(0).map((x, i) => i);
    websocket.reservationUpdate.subscribe( data => {
      for(let i = 0; i < data.length; i++){
        if(data[i].id === this.roomId){
          this.localReservations = data[i].reservations;
          break;
        }
      }
      this.roomsCollection = data;
      console.log("DATA!!", this.roomsCollection);
    });
    this.setDate();
  }

  public get nextReservation() : ReservationModel{
    return this.localReservations.find(x => x.startHour >  HomeComponent.caluculateDoubleHours());
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

  public showReservationPanel() : void{
    this.makeReservation = true;
  }
  public get isReserved() : boolean{
    if( !(this.currentReservation === null || this.currentReservation === undefined)){
      this.makeReservation = false;
      return true;
    }
    return false;
  }

  public setOccupied(){
    this.rest.sendReservationStarted(this.currentReservation);
  }

  public endCurrentReservation(){
    this.rest.sendReservationEnded(this.currentReservation);
  }

  public static caluculateDoubleHours() : number{
    return new Date().getHours() + new Date().getMinutes() / 60 + new Date().getSeconds() / 3600;
  }

  public get currentReservation() : ReservationModel{
    return this.localReservations.find(x => x.startHour <= HomeComponent.caluculateDoubleHours() && x.startHour + x.length > HomeComponent.caluculateDoubleHours());
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

  public closeReservationPanel() : void{
    this.makeReservation = false;
  }

  ngOnInit() {
  }

}

