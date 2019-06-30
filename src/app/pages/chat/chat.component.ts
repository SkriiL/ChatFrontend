import {Component, OnInit} from '@angular/core';
import {Chat} from '../../models/chat';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {Observable, of} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-chat',
  template: `
    <div class="container-fluid mt-3">
      <nav class="navbar navbar-expand navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <app-start-chat-modal (messageSent)="reload()"></app-start-chat-modal>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" *ngIf="selectedChat">
              <strong class="nav-link text-light">
                {{ selectedChat.user1.id === currentId$.getValue() ? selectedChat.user2.username : selectedChat.user1.username }}
              </strong>
            </li>
          </ul>
        </div>
      </nav>

      <div class="row text-light m-1">
        <div class="col-3 bg-dark">
          <app-all-chats (selectedChat)="selectChat($event)"></app-all-chats>
        </div>
        <div class="col-9 bg-dark" *ngIf="selectedChat">
          <app-chat-window [chat]="selectedChat"></app-chat-window>
        </div>
      </div>
    </div>
  `,
})
export class ChatComponent implements OnInit {
  public selectedChat: Chat | undefined;
  public currentId$ = UserService.currentId;

  selectChat(chat: Chat) {
    this.selectedChat = chat;
  }

  constructor(
  ) {
  }

  reload() {
    window.location.reload();
  }

  ngOnInit() {
  }

}
