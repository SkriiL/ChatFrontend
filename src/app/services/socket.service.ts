import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  initSocket() {
    this.socket = socketIo('192.168.178.46:56789'); // 'skriil.ddnss.de:56789'
  }

  public sendRequest(event: string, args: string) {
    this.socket.emit(event, args);
  }

  public onEvent(event: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, data => observer.next(data));
    });
  }

  constructor() {this.initSocket(); }
}
