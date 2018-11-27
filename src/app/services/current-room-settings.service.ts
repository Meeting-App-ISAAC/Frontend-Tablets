import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentRoomSettingsService {

  public id : number;
  public name : string;
  public location: string;
  public capacity: number;

  constructor() { }
}
