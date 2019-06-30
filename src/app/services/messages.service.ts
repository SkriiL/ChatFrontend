import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Message} from '../models/message';
import {now} from '../models/own-date';
import {ChatMessageXref} from '../models/chat-message-xref';
import {ChatService} from './chat.service';
import {UserService} from './user.service';
import {Chat} from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public messagesForChats$ = new BehaviorSubject<ChatMessageXref[]>([]);

  constructor(
    private socketService: SocketService,
    private chatService: ChatService,
  ) {
    this.chatService.getAllForUser(UserService.currentId.getValue()).subscribe((chats: Chat[]) => {
      const arr = [];
      for (let i = 0; i < chats.length; i++) {
        arr.push({
          chatId: chats[i].id,
          messages$: this.getAllSortedForChat(chats[i].id),
        });
      }
      this.messagesForChats$.next(arr);
    });
  }

  public getAllSortedForChat(chatId: number): Observable<Message[][]> {
    this.socketService.sendRequest('get-messages-sorted-for-chat', chatId.toString());
    return new Observable<Message[][]>(observer => {
      const sub = this.socketService.onEvent('messages-sorted-for-chat-' + chatId).subscribe((m: Message[][]) => {
        if (m) {
          observer.next(m);
          sub.unsubscribe();
        }
      });
    });
  }

  public sendMessage(userId: number, chatId: number, content: string) {
    const today = now();
    const dateStr = today.day + '.' + today.month + '.' + today.year + '|' + today.hour + ':' + today.minute;
    const str = userId + ';' + dateStr + ';' + chatId + ';' + content;
    this.socketService.sendRequest('send-message', str);
  }

  public onMessage(): BehaviorSubject<number> {
    const subject = new BehaviorSubject<number>(0);
    this.socketService.onEvent('new-message').subscribe(r => {
      if (r === 'new') {
        subject.next(subject.getValue() + 1);
      }
    });
    return subject;
  }
}
