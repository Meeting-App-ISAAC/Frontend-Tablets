import {Input, OnChanges, SimpleChanges} from '@angular/core';
import {ReservationModel} from '../interfaces/ReservationModel';
import {HomeComponent} from './home.component';

export class DurationButtonUser implements OnChanges {
  @Input() currentReservation : ReservationModel;
  @Input() nextReservation : ReservationModel;

  public timeButtonSelected : number = 0;
  public timeButtonsFree : number = -1;
  private interval;

  protected setButtonFree(time : number){
    this.timeButtonsFree = time;
    if(this.timeButtonSelected >= time){
      this.timeButtonSelected = time;
    }
  }

  protected getMinutes() : number{
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
  private calcualteTimeUntil(){

    if(!this.nextReservation){
      this.setButtonFree(3);
      return;
    }
    let current = !this.currentReservation ? HomeComponent.caluculateDoubleHours() : (this.currentReservation.startHour + this.currentReservation.length);

    let timeUntilinMinutes =  (this.nextReservation.startHour - current) * 60;
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
  ngOnInit() {
    this.calcualteTimeUntil();
    clearInterval(this.interval);
    this.interval = setInterval(() => this.calcualteTimeUntil(), 1000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes.nextReservation){
      this.calcualteTimeUntil();
    }
  }
}
