import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';
import {ReservationModel} from '../../interfaces/ReservationModel';

@Component({
  selector: 'app-occupied',
  templateUrl: './occupied.component.html',
  styleUrls: ['./occupied.component.css']
})
export class OccupiedComponent implements OnInit {

  @Input() currentReservation : ReservationModel;
  @Input() until : Date;
  @Input() title : String;
  @Output() end = new EventEmitter();
  public timeButtonSelected : number = 0;
  public showDialog : boolean =false;
  public constructor(private rest : ReservationStatusRESTService){}
  ngOnInit() {
  }
  public endEvent() : void{
    this.end.emit();
  }
  public extendEvent() : void{
    this.openExtendDialog();
  }
  private openExtendDialog() : void{
    this.showDialog = true;
  }
  public closeExtendDialog() : void{
    this.showDialog = false;
    this.timeButtonSelected = 0;
  }
  public submitExtendDialog() : void{
    this.closeExtendDialog();
    this.rest.sendReservationExtend(this.currentReservation, this.getMinutes());
  }
  private getMinutes() : number{
    switch (this.timeButtonSelected){
      case 0: return 15;
      case 1: return 30;
      case 2: return 45;
      case 3: return 60;
    }
  }
  public clickTimeButton(id : number): void{
    this.timeButtonSelected = id;
  }
}
