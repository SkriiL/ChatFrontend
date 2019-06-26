import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {SocketService} from './socket.service';
import {Friend} from '../models/friend';
import {FriendRequest} from '../models/friend-request';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsService {

  constructor(
    private socketService: SocketService,
  ) {
  }

  sendRequest(userId: number) {
    const str = UserService.currentId.getValue() + ';' + userId;
    this.socketService.sendRequest('send-friend-request', str);
  }

  newFriendRequest(): Observable<number> {
    return new Observable<number>(observer => {
      this.socketService.onEvent('new-friend-request').subscribe(id => {
        observer.next(id);
      });
    });
  }

  getAllForUser(userId: number): Observable<FriendRequest[]> {
    this.socketService.sendRequest('get-friend-requests-for-user', userId.toString());
    return new Observable<Friend[]>(observer => {
      const sub = this.socketService.onEvent('friend-requests-for-user').subscribe(fr => {
        observer.next(fr);
      });
    });
  }

  accept(id: number) {
    this.socketService.sendRequest('accept-friend-request', id.toString());
  }

  reject(id: number) {
    this.socketService.sendRequest('reject-friend-request', id.toString());
  }
}
