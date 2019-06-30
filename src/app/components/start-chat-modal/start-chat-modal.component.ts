import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalManager} from 'ngb-modal';
import {UserService} from '../../services/user.service';
import {FriendsService} from '../../services/friends.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../services/common.service';
import {map} from 'rxjs/internal/operators';
import {Friend} from '../../models/friend';
import {ChatService} from '../../services/chat.service';
import {MessagesService} from '../../services/messages.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-chat-modal',
  templateUrl: './start-chat-modal.component.html',
})
export class StartChatModalComponent implements OnInit {
  @Output() messageSent = new EventEmitter(false);

  private modalRef;
  public currentId$ = UserService.currentId;
  public users$ = this.friendsService.getAllForUser(this.currentId$.getValue()).pipe(
    map((fs: Friend[]) => {
      return fs.map(f => {
        if (f.user1.id === this.currentId$.getValue()) {
          return f.user2;
        } else {
          return f.user1;
        }
      });
    }),
  );

  public typeaheadSettings = this.commonService.typeaheadSettings;

  public formGroup = new FormGroup({
    selectedUserId: new FormControl('',  [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private modal: ModalManager,
    private friendsService: FriendsService,
    private commonService: CommonService,
    private chatService: ChatService,
    private messagesService: MessagesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  openModal(modalTpl) {
    this.modalRef = this.modal.open(modalTpl, {
      size: 'md',
      hideCloseButton: false,
      centered: false,
      backdrop: false,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
    });
  }

  closeModal() {
    this.modal.close(this.modalRef);
  }

  sendMessage() {
    if (this.formGroup.invalid) {
      this.toastr.error('All fields need to be filled.');
      return;
    }
    const id = this.formGroup.get('selectedUserId').value;
    const content = this.formGroup.get('content').value;
    const sub = this.chatService.getChatBetweenUsers(this.currentId$.getValue(), id).subscribe(res => {
      if (res) {
        this.toastr.error(`You can't start a chat with someone you are already chatting with.`);
        return sub.unsubscribe();
      }
      this.chatService.create(this.currentId$.getValue(), id).subscribe(chatId => {
        if (chatId) {
          this.messagesService.sendMessage(this.currentId$.getValue(), chatId, content);
          this.closeModal();
          this.messageSent.emit(true);
        }
      });
    });
  }

}
