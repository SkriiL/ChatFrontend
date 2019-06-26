import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {SocketService} from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatFrontend';

  constructor(
    private socketService: SocketService,
  ) {
    this.socketService.onEvent('connected').subscribe((sid: string) => {
      SocketService.sid.next(sid);
    });
  }
}
