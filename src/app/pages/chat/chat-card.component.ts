import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Chat} from '../../models/chat';
import {Message} from '../../models/message';
import {UserService} from '../../services/user.service';
import {MessagesService} from '../../services/messages.service';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-chat-card',
  template: `
    <div class="card bg-dark">
      <div class="card-body">
        <strong class="card-title" *ngIf="chat.user1.id === currentId$.getValue()">{{ chat.user2.username }}</strong>
        <strong class="card-title" *ngIf="chat.user2.id === currentId$.getValue()">{{ chat.user1.username }}</strong><br>
        <div *ngIf="messages$ | async as messages">
          <span *ngIf="messages.length > 0">
            <i *ngIf="last(messages[messages.length - 1]).user.id !== currentId$.getValue()" class="fa fa-arrow-circle-o-left"></i>
            {{ last(messages[messages.length - 1]).content }}
            <i *ngIf="last(messages[messages.length - 1]).user.id === currentId$.getValue()" class="fa fa-arrow-circle-o-right"></i><br>
            <span class="text-small">{{ last(messages[messages.length - 1]).date | dateFormat:'chat' }}</span>
          </span>
        </div>
      </div>
    </div>
  `,
})
export class ChatCardComponent implements OnInit {
  public chat: Chat | undefined;
  public messages$: Observable<Message[][]> | undefined;
  public currentId$ = UserService.currentId;

  @Input('chat')
  set _chat(value: Chat) {
    this.chat = value;
    this.messagesService.messagesForChats$.subscribe(mcs => {
      if (mcs.length > 0) {
        this.messages$ = mcs.find(mc => mc.chatId === value.id) ? mcs.find(mc => mc.chatId === value.id).messages$ : undefined;
      }
    });
  }

  constructor(
    private messagesService: MessagesService,
  ) { }

  last(array) {
    return array[array.length - 1];
  }

  ngOnInit() {
  }

}
