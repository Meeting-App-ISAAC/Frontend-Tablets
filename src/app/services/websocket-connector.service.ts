import {EventEmitter, Injectable} from '@angular/core';
import {EventListener} from '@angular/core/src/debug/debug_node';
import {LocalDeviceDataService} from './local-device-data.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectorService {

  private tw : WebSocket = null;
  public connected : boolean = false;
  constructor(private localSettings : LocalDeviceDataService) {
    this.connect();
    this.settings.maxReservationWindow = 20;
  }
  public reservationUpdate = new EventEmitter();
  public settingsUpdate = new EventEmitter();
  public settings : any = {};
  private connect() : void{
    try {
      if(this.tw === null || this.tw.readyState === this.tw.CLOSING || this.tw.readyState === this.tw.CLOSED) {
        this.connected = false;
        this.tw = new WebSocket("ws://"+location.hostname+":8090/reservation/");
        this.tw.onmessage = (message) => {
          let data = JSON.parse(message.data).messageData;
          if(!!data.type && data.type === "settings"){
            this.settingsUpdate.emit(data)
            this.settings = data;
            console.log(data)
            console.log(data['language'])
            if (localStorage.getItem('Language') == null) {
              localStorage.setItem('Language', data['language'])
            }
          } else {
            this.reservationUpdate.emit(data);
          }
        };
        this.tw.onopen = () => {
          console.log("OPEN!");
          this.tw.send(this.localSettings.key);
          this.connected = true;
        };
        this.tw.onerror = () => {
          this.connect();
        };
        this.tw.onclose = () => {
          this.connect();
        }
      }
    }catch (e){
      setTimeout(() => this.connect(), 100);
    }
  }



}
