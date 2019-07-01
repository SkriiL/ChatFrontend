import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../../models/chat';
import {Message} from '../../models/message';
import {Observable} from 'rxjs';
import {MessagesService} from '../../services/messages.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {PerfectScrollbarComponent, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-chat-window',
  template: `
    <div class="container-fluid" style="height: 85vh">
      <div class="scrollbar" #scrollbar id="scrollbar" style="max-height: 80%; height: 80%">
        <div *ngFor="let messages of messages$ | async">
          <div class="text-center mt-3 mb-3">
            <button class="btn btn-outline-light" disabled>{{ messages[0].date | dateFormat }}</button>
          </div>
          <div class="mb-3">
            <app-message *ngFor="let message of messages" [message]="message"></app-message>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <input class="form-control" placeholder=". . ." formControlName="content">
        <div class="input-group-append">
          <div class="input-group-text pointer" (click)="sendMessage()">
            Send
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollbar', {static: false}) scrollbar: ElementRef;

  public chat: Chat | undefined;
  public messages$: Observable<Message[][]>;
  public currentId$ = UserService.currentId;

  public formGroup = new FormGroup({
    content: new FormControl(''),
  });

  @Input('chat')
  set _chat(value: Chat) {
    console.log(value);
    if (value) {
      this.chat = value;
      this.messages$ = this.messagesService.getAllSortedForChat(value.id);
    }
  }

  ngAfterViewChecked() {
    this.scrollbar.nativeElement.scrollTop = this.scrollbar.nativeElement.scrollHeight;
  }

  constructor(
    private messagesService: MessagesService,
  ) {
    this.messagesService.onMessage().subscribe(t => {
      if (t > 0) {
        this.messages$ = this.messagesService.getAllSortedForChat(this.chat.id);
      }
    });
  }

  ngOnInit() {
  }

  sendMessage() {
    const content = this.formGroup.get('content').value;
    if (content && content.length > 0) {
      this.messagesService.sendMessage(this.currentId$.getValue(), this.chat.id, content);
      this.formGroup.get('content').setValue('');
    }
  }

}
