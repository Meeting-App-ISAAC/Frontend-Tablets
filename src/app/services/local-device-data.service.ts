import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalDeviceDataService {


  constructor() {
    this.id = parseInt( localStorage.getItem("id")) || -1;
    this.key = localStorage.getItem("key");
    this.showCalendar = localStorage.getItem("showCalendar") === "1";
    this.isAdmin = localStorage.getItem("isAdmin") === "1";

    this.loadedFromStorage = this.key !== null;
  }

  public id: number = -1;
  public key: string = "";
  public loadedFromStorage : boolean = false;
  public showCalendar : boolean = true;
  public isAdmin : boolean = false;

  save() {
    localStorage.setItem("id", this.id.toString());
    localStorage.setItem("key", this.key.toString());
    localStorage.setItem("showCalendar", this.showCalendar ? "1" : "0");
    localStorage.setItem("isAdmin", this.isAdmin  ? "1" : "0");
  }
}
