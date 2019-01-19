import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ReservationStatusRESTService} from '../../services/reservation-status-rest.service';
import {ReservationModel} from '../../interfaces/ReservationModel';
import {DurationButtonUser} from '../DurationButtonUser';
import LanguageFile from "../../../assets/LanguageFile";

@Component({
  selector: 'app-occupied',
  templateUrl: './occupied.component.html',
  styleUrls: ['./occupied.component.css']
})
export class OccupiedComponent extends DurationButtonUser implements AfterViewInit, OnChanges{

  findfreeroombutton = LanguageFile[localStorage.getItem('Language')]['findfreeroom.button'];
  occupied = LanguageFile[localStorage.getItem('Language')]['general.occupied'];
  generalend = LanguageFile[localStorage.getItem('Language')]['general.end'];
  generalextend = LanguageFile[localStorage.getItem('Language')]['general.extend'];
  extendmeeting = LanguageFile[localStorage.getItem('Language')]['general.extendmeeting'];
  by = LanguageFile[localStorage.getItem('Language')]['freemeetingrooms.by'];
  freemeetingroomsuntil = LanguageFile[localStorage.getItem('Language')]['freemeetingrooms.until'];
  howlongextend = LanguageFile[localStorage.getItem('Language')]['extendreservation.howlong'];
  extendtitle = LanguageFile[localStorage.getItem('Language')]['extendreservation.extendmeeting'];
  extenderror = LanguageFile[localStorage.getItem('Language')]['extendreservation.error'];
  extenderror2 = LanguageFile[localStorage.getItem('Language')]['extendreservation.error2'];

  @Input() until : Date;
  @Input() title : String;
  @Output() end = new EventEmitter();
  @Output() findRoom = new EventEmitter();
  public showDialog : boolean =false;
  public error : boolean = false;
  public constructor(private rest : ReservationStatusRESTService){
    super();
  }


  public ngAfterViewInit(): void {

    this.reset();
  }

  private reset() : void{
    this.showDialog = false;
    this.timeButtonSelected = 0;
    this.error = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if(!!changes.until && !!changes.until.previousValue && !!changes.until.currentValue){
      if(changes.until.previousValue.getTime() - changes.until.currentValue.getTime() !== 0) {
        this.reset();
      }
    }
  }

  public endEvent() : void{
    this.closeExtendDialog();
    this.end.emit();
  }
  public extendEvent() : void{
    this.openExtendDialog();
  }
  private openExtendDialog() : void{
    console.log(this.currentReservation);
    console.log(this.nextReservation);
    console.log(this.timeButtonsFree);
    this.showDialog = true;
  }
  public closeExtendDialog() : void{
    this.reset();
  }
  private showError(){
    this.error = true;
  }
  private hideError(){
    this.error = false;
  }
  public submitExtendDialog() : void{
    this.hideError();
    this.rest.changeLoading(true);
    this.rest.sendReservationExtend(this.currentReservation, this.getMinutes()).subscribe(
      (val) => {
        if(val.toString() === 'true'){
          this.closeExtendDialog();
        } else {
          this.showError();
        }
        this.rest.changeLoading(false);
      },
      response => {
        //POST call in error
        this.rest.changeLoading(false);
      },
      () => {
        this.rest.changeLoading(false);
        //The POST observable is now completed
      });
  }
}
