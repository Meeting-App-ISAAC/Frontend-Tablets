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

  private calculateReservations(){
    this.calculateCurrentReservation();
    this.calculateNextReservation();
  }
  private calculateDisplayScreen(force = false){
    if(this.displayScreen !== "free" && this.displayScreen !== "occupied" && this.displayScreen !== "reserved" && !force) {
      return;
    }
    if(this.data.isAdmin){
      this.showSelectRoom();
      return;
    }
    //console.log(this.currentReservation);
    if(!!this.currentReservation){
      if(this.currentReservation.hasStarted){
        this.setDisplayScreenIfDifferent("occupied");
      } else {
        this.setDisplayScreenIfDifferent("reserved");
      }
    } else {
      this.setDisplayScreenIfDifferent("free");
    }
  }





  constructor(public websocket :  WebsocketConnectorService, public rest : ReservationStatusRESTService, public data : LocalDeviceDataService, public roomSetting : CurrentRoomSettingsService) {
    this.roomId = this.data.id;
    this.numbers = (new Array(24)).fill(0).map((x, i) => i);
    websocket.reservationUpdate.subscribe( data => {
      this.roomsCollection = data;
      console.log("DATA!!", this.roomsCollection);
      this.setLocalRoomInformation();
      this.calculateDisplayScreen();
    });
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
    this.calculateReservations();
  }
  private static reservationDiffer(first : ReservationModel, second : ReservationModel) : boolean{
    return ((!!first && !second) || (!first  && !!second) || (!!first && !!second && (first.id != second.id || first.hasStarted != second.hasStarted || first.startHour != second.startHour || first.title != second.title || first.length != second.length )));
  }
  private calculateNextReservation() {
    const found = this.localReservations.find(x => x.startHour >  HomeComponent.caluculateDoubleHours());

    if(HomeComponent.reservationDiffer(this.nextReservation, found)){
      console.log("next has been changed!");
      this.nextReservation = found;
    }
  }
  public nextReservation : ReservationModel = undefined;

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
    this.setDisplayScreenIfDifferent("new reservation");
  }

  private cachedId = -1;
  public showReservationPanelForOther(id : number){
    this.cachedId = this.roomId;
    this.roomId = id;
    this.setDisplayScreenIfDifferent("new reservation mimic");
    this.setLocalRoomInformation();

  }
  public showSelectRoom() {
    if(this.data.isAdmin){
      this.data.showCalendar = false;
    }
    this.setDisplayScreenIfDifferent("room select");
  }

  private setDisplayScreenIfDifferent(value : string){
    if(this.displayScreen != value){
      this.displayScreen = value;
    }
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
    return new Date().getHours() + new Date().getMinutes() / 60 + (new Date().getSeconds() + 3) / 3600;
  }
  private calculateCurrentReservation() {

    const found = this.localReservations.find(x => x.startHour <= HomeComponent.caluculateDoubleHours() && x.startHour + x.length > HomeComponent.caluculateDoubleHours());
    if(HomeComponent.reservationDiffer(this.currentReservation, found)){
      console.log("current has been changed!");
      this.currentReservation = found;
    }
  }
  public currentReservation : ReservationModel;

  public get getReservationUntil() : Date{
    const res = this.currentReservation;
    if(res === undefined){
      return new Date();
    }
    let result = new Date();
    result.setHours(0, 0, (res.startHour+ res.length) * 60 * 60, 0);
    return result;
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
  public ngDoCheck(){
    this.currentDate = new Date();
    this.calculateReservations();
    this.calculateDisplayScreen();
  }

}

