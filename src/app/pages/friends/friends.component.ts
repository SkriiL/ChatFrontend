import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../../services/friends.service';
import {UserService} from '../../services/user.service';
import {Friend} from '../../models/friend';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user';
import {FormControl, FormGroup} from '@angular/forms';
import {FriendRequestsService} from '../../services/friend-requests.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
})
export class FriendsComponent implements OnInit {
  public currentId = UserService.currentId.getValue();
  public friends$ = this.friendsService.getAllForUser(UserService.currentId.getValue());
  public users$ = this.userService.getAll();

  public typeaheadSettings = {
    typeDelay: 50,
    suggestionsLimit: 10,
    noMatchesText: 'No matches found',
    tagClass: 'btn badge badge-primary',
    tagRemoveIconClass: '',
    dropdownMenuClass: 'dropdown-menu w-100',
    dropdownMenuExpandedClass: 'dropdown-menu show w-100',
    dropdownMenuItemClass: 'dropdown-item',
    dropdownToggleClass: 'dropdown-toggle',
  };


  public formGroup = new FormGroup({
    selectedUserId: new FormControl(''),
  });

  constructor(
    private friendsService: FriendsService,
    private toastr: ToastrService,
    private userService: UserService,
    private friendRequestsService: FriendRequestsService
  ) { }

  ngOnInit() {
  }

  removeFriend(friend: Friend) {
    this.friendsService.delete(friend.id);
    const otherUser = this.currentId === friend.user2.id ? friend.user1 : friend.user2;
    this.toastr.success('Friend "' + otherUser.username + '" removed.');
    this.friends$ = this.friendsService.getAllForUser(UserService.currentId.getValue());
  }

  addFriend() {
    const id = this.formGroup.get('selectedUserId').value;
    if (id > 0) {
      this.friendRequestsService.sendRequest(this.formGroup.get('selectedUserId').value);
      this.userService.getSingleById(id).subscribe(u => {
        this.toastr.success('Friend request sent to ' + u.username);
      });
    }
  }

}
