import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';

@Component({
  selector: 'app-free-meeting-room',
  templateUrl: './free-meeting-room.component.html',
  styleUrls: ['./free-meeting-room.component.css']
})
export class FreeMeetingRoomComponent implements OnInit, OnChanges {


  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes.roomData){
        this.CalculateFreeRooms();
    }
  }

  public meetingRooms = [];

  @Input() roomData;

  constructor( private rest: ReservationStatusRESTService ) {
  }

  public bookRoom(id : number) : void{
    alert(id);
  }

  private CalculateFreeRooms() : void{
    this.meetingRooms = [];
    debugger;
    for(let i = 0; i < this.roomData.length; i++){
      const room : MeetingRoom = this.roomData[i];
      const data = FreeMeetingRoomComponent.GetFreeUntilDate(room);
      if(data.isFree){
        let date = new Date();
        date.setSeconds(data.until * 60 * 60);
        this.meetingRooms.push(
          {
            name: room.name,
            capacity: room.capacity,
            location: room.location,
            id: room.id,
            free: date
          }
        )
      }
    }
  }

  private static GetFreeUntilDate(room) : any{
    let result = {
      "isFree" : false,
      "until" : 24
    };


      for(let y = 0; y < room.reservations.length; y++){
        const reservation = room.reservations[y];
        if(reservation.startHour < new Date().getHours() && (reservation.startHour + reservation.length) > new Date().getHours() ){
          result.isFree = false;
          break;
        }
        if(reservation.startHour > new Date().getHours() && reservation.startHour < result.until){
          result.isFree = true;
          result.until = reservation.startHour;
        }
      }


    return result;
  }

  ngOnInit() {
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
