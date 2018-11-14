import {EventEmitter, Injectable} from '@angular/core';
import {EventListener} from '@angular/core/src/debug/debug_node';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectorService {

  private tw : WebSocket = null;
  public connected : boolean = false;
  constructor() {
    this.connect();
  }

  private connect() : void{
    try {
      if(this.tw === null || this.tw.readyState === this.tw.CLOSING || this.tw.readyState === this.tw.CLOSED) {
        this.connected = false;
        this.tw = new WebSocket("ws://"+location.hostname+":8090/reservation/");
        this.tw.onmessage = (message) => {
          console.log(JSON.parse(message.data));
          this.reservationUpdate.emit(JSON.parse(message.data));
        };
        this.tw.onopen = () => {
          console.log("OPEN!");
          this.connected = true;
          let temp = {"roomId": 1};
          this.tw.send(JSON.stringify(temp));
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
  public reservationUpdate = new EventEmitter();


}
