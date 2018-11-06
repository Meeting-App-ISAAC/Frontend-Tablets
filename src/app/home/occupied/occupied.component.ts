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
  @Input() nextReservation : ReservationModel;
  @Input() until : Date;
  @Input() title : String;
  @Output() end = new EventEmitter();
  public timeButtonSelected : number = 0;
  public timeButtonsFree : number = -1;

  public showDialog : boolean =false;
  public error : boolean = false;
  public constructor(private rest : ReservationStatusRESTService){}
  private setButtonFree(time : number){
    this.timeButtonsFree = time;
    if(this.timeButtonSelected > time){
      this.timeButtonSelected = time;
    }
  }
  ngOnInit() {

    if(!this.nextReservation){
      this.setButtonFree(3);
      return;
    }

    let timeUntilinMinutes =  (this.nextReservation.startHour - this.currentReservation.startHour + this.currentReservation.length) * 60;
    if(timeUntilinMinutes < 15){
      this.setButtonFree(-1);
      return;
    }
    if(timeUntilinMinutes < 30){
      this.setButtonFree(0);
      return;
    }
    if(timeUntilinMinutes < 45){
      this.setButtonFree(1);
      return;
    }
    if(timeUntilinMinutes < 60){
      this.setButtonFree(2);
      return;
    }
    this.setButtonFree(3);

  }
  public endEvent() : void{
    this.closeExtendDialog();
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
  private showError(){
    this.error = true;
  }
  private hideError(){
    this.error = false;
  }
  public submitExtendDialog() : void{
    this.hideError();
    this.rest.sendReservationExtend(this.currentReservation, this.getMinutes()).subscribe(
      (val) => {
        if(val.toString() === "true"){
          this.closeExtendDialog();
        } else {
          this.showError();
        }
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
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
