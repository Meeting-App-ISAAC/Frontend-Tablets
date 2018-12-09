import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';
import {HomeComponent} from '../home.component';
import {WebsocketConnectorService} from '../../services/websocket-connector.service';

@Component({
  selector: 'app-free-meeting-room',
  templateUrl: './free-meeting-room.component.html',
  styleUrls: ['./free-meeting-room.component.css']
})
export class FreeMeetingRoomComponent implements OnInit, OnChanges, AfterViewInit {
  ngAfterViewInit(): void {
    this.setTimer();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes.roomData){
        this.CalculateFreeRooms();
    }
  }

  public meetingRooms = [];

  @Input() roomData;
  @Output() roomSelected = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor( private rest: ReservationStatusRESTService, public websocket :  WebsocketConnectorService ) {
  }

  public bookRoom(id : number) : void{
    this.roomSelected.emit(id);
  }

  public cancelEvent() : void{
    this.cancel.emit();
  }
  private CalculateFreeRooms() : void{
    let outcome = [];
    for(let i = 0; i < this.roomData.length; i++){
      const room : MeetingRoom = this.roomData[i];
      const data = FreeMeetingRoomComponent.GetFreeUntilDate(room);

      if(data.isFree){
        let date = null;
        if(data.until !== null) {
          date = new Date();
          date.setHours(0, 0, data.until * 60 * 60, 0);
        }
        outcome.push(
          {
            name: room.name,
            capacity: room.capacity,
            location: room.location,
            id: room.id,
            free: date,
            diff: data.until === null ? 24 * 60 : (data.until - HomeComponent.caluculateDoubleHours()) * 60
          }
        )
      }
    }

    this.meetingRooms = outcome;
  }

  private static GetFreeUntilDate(room) : any{
    let result = {
      "isFree" : true,
      "until" : null
    };


      for(let y = 0; y < room.reservations.length; y++){
        const reservation = room.reservations[y];
        if(reservation.startHour < HomeComponent.caluculateDoubleHours() && (reservation.startHour + reservation.length) > HomeComponent.caluculateDoubleHours() ){
          result.isFree = false;
          break;
        }
        if(reservation.startHour > HomeComponent.caluculateDoubleHours() && reservation.startHour < result.until || result.until === null){
          result.isFree = true;
          result.until = reservation.startHour;
        }
      }


    return result;
  }

  private interval;
  private setTimer() : void{
    clearInterval(this.interval);
    this.interval = setInterval(() => this.CalculateFreeRooms(), 1000);
  }


  ngOnInit() {
    this.setTimer();
  }

}
interface MeetingRoom{
  name : string;
  capacity: number;
  location: string;
  id: number;
}
interface FreeMeetingRoom extends MeetingRoom{
  free: Date;
}
