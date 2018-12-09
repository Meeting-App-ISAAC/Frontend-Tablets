import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDeviceDataService {

  constructor() {
    this.id = parseInt( localStorage.getItem("id")) || -1;
    this.key = localStorage.getItem("key");
    this.loadedFromStorage = this.id !== -1 || this.key !== null;
  }

  public id: number = -1;
  public key: string = "";
  public loadedFromStorage : boolean = false;

  save() {
    localStorage.setItem("id", this.id.toString());
    localStorage.setItem("key", this.key.toString());
  }
}
