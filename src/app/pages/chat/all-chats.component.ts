import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Chat} from '../../models/chat';

@Component({
  selector: 'app-all-chats',
  template: `
    <app-chat-card *ngFor="let chat of chats$ | async" [chat]="chat" (click)="selectChat(chat)"></app-chat-card>
  `,
})
export class AllChatsComponent implements OnInit {
  @Output('selectedChat') selectedChat = new EventEmitter<Chat>();

  public currentId$ = UserService.currentId;
  public chats$ = this.chatService.getAllForUser(this.currentId$.getValue());

  constructor(
    private chatService: ChatService,
  ) {
    this.chats$ = this.chatService.getAllForUser(this.currentId$.getValue());
  }

  ngOnInit() {
  }

  selectChat(chat: Chat) {
    this.selectedChat.emit(chat);
  }

}
