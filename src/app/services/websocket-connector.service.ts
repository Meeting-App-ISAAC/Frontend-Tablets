import {EventEmitter, Injectable} from '@angular/core';
import {EventListener} from '@angular/core/src/debug/debug_node';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectorService {

  private tw : WebSocket;
  constructor() {

    this.tw  = new WebSocket("ws://localhost:8090/reservation/");
    this.tw.onmessage = (message) => {
      console.log(JSON.parse(message.data));
      this.reservationUpdate.emit(JSON.parse(message.data));
    };
    this.tw.onopen = () => {
      console.log("OPEN!");
      var temp = {"roomId": 1};
      this.tw.send(JSON.stringify(temp));
    };
  }
  public reservationUpdate = new EventEmitter();


}
