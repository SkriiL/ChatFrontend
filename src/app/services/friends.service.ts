import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {Observable} from 'rxjs';
import {Friend} from '../models/friend';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(
    private socketService: SocketService,
  ) {
  }

  getAllForUser(userId: number) {
    this.socketService.sendRequest('get-friends-for-user', userId.toString());
    return new Observable<Friend[]>(observer => {
      const sub = this.socketService.onEvent('friends-for-user').subscribe(friends => {
        observer.next(friends);
        sub.unsubscribe();
      });
    });
  }

  delete(id: number) {
    this.socketService.sendRequest('delete-friend', id.toString());
  }

}
