import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Http} from "@angular/http";
import LanguageFile from "../../../assets/LanguageFile";

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit, OnChanges {

  findfreeroom = LanguageFile[localStorage.getItem('Language')]['findfreeroom.button'];
  usemeetingroombutton = LanguageFile[localStorage.getItem('Language')]['usemeetingroom.button'];
  free = LanguageFile[localStorage.getItem('Language')]['general.free'];
  freemeetingroomuntil = LanguageFile[localStorage.getItem('Language')]['freemeetingrooms.until'];

  @Output() findRoom = new EventEmitter();
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes.until){
      this.setShowButton();
    }
  }

  @Input() until : Date;
  @Output() reservationEvent = new EventEmitter();
  public showButton : boolean = true;

  constructor() {
    console.log(LanguageFile[localStorage.getItem('Language')]);
  }

  public use() : void{
    this.reservationEvent.emit();
  }
  private setShowButton() : void{
    if(!this.until){
      this.showButton = true;
      return;
    }
    let copy = new Date(this.until.getTime() - 20*60000);
    this.showButton = copy > new Date();
  }
}
