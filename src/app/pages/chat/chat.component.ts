import {AfterViewChecked, Component, OnChanges, OnInit} from '@angular/core';
import {Chat} from '../../models/chat';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {Observable, of} from 'rxjs';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ToastrService} from 'ngx-toastr';

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
              <div class="nav-link text-light">
                <strong>
                  {{ selectedChat.user1.id === currentId$.getValue() ? selectedChat.user2.username : selectedChat.user1.username }}
                </strong>
                - {{ selectedChat.user1.id === currentId$.getValue() ? selectedChat.user2.status : selectedChat.user1.status }}
              </div>
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
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  reload() {
    window.location.reload();
  }

  ngOnInit() {
  }

}
