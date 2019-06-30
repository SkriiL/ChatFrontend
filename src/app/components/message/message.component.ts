import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../models/message';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-message',
  template: `
    <div [class]="cardClass">
      <div class="card-body text-dark">
        <strong class="card-title">{{ username }}</strong><br>
        <span>{{ message.content }}</span><br>
        <span class="text-small">{{ message.date | dateFormat:'time' }}</span>
      </div>
    </div>
  `,
})
export class MessageComponent implements OnInit {
  public message: Message | undefined;
  public cardClass = 'card bg-dark mb-3';
  public currentId$ = UserService.currentId;
  public username = '';

  @Input('message')
  set _message(value: Message) {
    this.message = value;
    this.cardClass = this.message.user.id === this.currentId$.getValue() ? 'card bg-light text-right mb-3' : 'card bg-light text-left mb-3';
    this.username = this.message.user.id === this.currentId$.getValue() ? 'Ich' : this.message.user.username;
  }

  constructor() { }

  ngOnInit() {
  }

}
