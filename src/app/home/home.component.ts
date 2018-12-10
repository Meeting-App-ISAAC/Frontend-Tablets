import {Component, Input, OnInit} from '@angular/core';
import {WebsocketConnectorService} from '../services/websocket-connector.service';
import { ReservationModel} from '../interfaces/ReservationModel';
import {ReservationStatusRESTService} from '../services/reservation-status-rest.service';
import {LocalDeviceDataService} from '../services/local-device-data.service';
import {CurrentRoomSettingsService} from '../services/current-room-settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public numbers: number[];
  public roomId : number = 0;
  public localReservations: ReservationModel[] = [];
  public roomsCollection = [];


  public currentDate : Date = new Date();
  @Input() backgroundColor : string = "red";
  @Input() showName : boolean = true;
  @Input() textColor : string = "white";

  public displayScreen = "free";

  private calculateDisplayScreen(force = false){
    if(this.displayScreen !== "free" && this.displayScreen !== "occupied" && this.displayScreen !== "reserved" && !force) {
      return;
    }
    //console.log(this.currentReservation);
    if(!!this.currentReservation){
      if(this.currentReservation.hasStarted){
        this.displayScreen = "occupied";
      } else {
        this.displayScreen = "reserved";
      }
    } else {
      this.displayScreen = "free";
    }
  }

  private setDate() : void{
    setInterval(() => {
      this.currentDate = new Date();
        this.calculateDisplayScreen();

    }, 500);
  }



  constructor(public websocket :  WebsocketConnectorService, private rest : ReservationStatusRESTService, private data : LocalDeviceDataService, public roomSetting : CurrentRoomSettingsService) {
    this.roomId = this.data.id;
    this.numbers = (new Array(24)).fill(0).map((x, i) => i);
    websocket.reservationUpdate.subscribe( data => {
      this.roomsCollection = data;
      console.log("DATA!!", this.roomsCollection);
      this.setLocalRoomInformation();
      this.calculateDisplayScreen();
    });
    this.setDate();
  }

  private setLocalRoomInformation(){
    for(let i = 0; i < this.roomsCollection.length; i++){
      if(this.roomsCollection[i].id === this.roomId){
        this.localReservations = this.roomsCollection[i].reservations;
        this.roomSetting.capacity = this.roomsCollection[i].capacity;
        this.roomSetting.id = this.roomsCollection[i].id;
        this.roomSetting.location = this.roomsCollection[i].location;
        this.roomSetting.name = this.roomsCollection[i].name;
        break;
      }
    }
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
    this.displayScreen = "new reservation";
  }

  private cachedId = -1;
  public showReservationPanelForOther(id : number){
    this.cachedId = this.roomId;
    this.roomId = id;
    this.displayScreen = "new reservation mimic";
    this.setLocalRoomInformation();

  }
  public showSelectRoom() {
    this.displayScreen = "room select";
  }
  public hideSelectRoom(){
    this.calculateDisplayScreen(true);
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
    if(this.displayScreen === 'new reservation mimic'){
      this.roomId = this.roomSetting.id = this.cachedId;
    }
    this.setLocalRoomInformation();
    this.calculateDisplayScreen(true);
  }

  ngOnInit() {
  }

}

