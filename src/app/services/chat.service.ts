import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {Observable} from 'rxjs';
import {Chat} from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socketService: SocketService,
  ) {
  }

  public getAllForUser(userId: number) {
    this.socketService.sendRequest('get-chats-for-user', userId.toString());
    return new Observable<Chat[]>(observer => {
      const sub = this.socketService.onEvent('chats-for-user').subscribe((chats: Chat[]) => {
        if (chats) {
          observer.next(chats);
          sub.unsubscribe();
        }
      });
    });
  }

  public create(user1Id: number, user2Id: number): Observable<number> {
    this.socketService.sendRequest('create-chat', user1Id + ';' + user2Id);
    return new Observable<number>(observer => {
      const sub = this.socketService.onEvent('created-chat').subscribe((id: number) => {
        if (id) {
          observer.next(id);
          sub.unsubscribe();
        }
      });
    });
  }

  public getChatBetweenUsers(userId1, userId2): Observable<Chat | undefined> {
    this.socketService.sendRequest('get-chat-between-users', userId1 + ';' + userId2);
    return new Observable<Chat | undefined>(observer => {
      const sub = this.socketService.onEvent('chat').subscribe(chat => {
        if (chat === 'None') {
          observer.next(undefined);
          sub.unsubscribe();
        } else if (chat) {
          observer.next(chat);
          sub.unsubscribe();
        }
      });
    });
  }

  public getSingleById(id: number) {
    this.socketService.sendRequest('get-single-chat', id.toString());
    return new Observable<Chat>(observer => {
      const sub = this.socketService.onEvent('single-chat').subscribe((chat: Chat) => {
        if (chat) {
          observer.next(chat);
          sub.unsubscribe();
        }
      });
    });
  }
}
