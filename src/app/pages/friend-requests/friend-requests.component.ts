import { Component, OnInit } from '@angular/core';
import {FriendRequestsService} from '../../services/friend-requests.service';
import {UserService} from '../../services/user.service';
import {FriendRequest} from '../../models/friend-request';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
})
export class FriendRequestsComponent implements OnInit {
  public currentId$ = UserService.currentId;
  public requests$ = this.friendRequestsService.getAllForUser(this.currentId$.getValue());

  constructor(
    private friendRequestsService: FriendRequestsService,
  ) { }

  ngOnInit() {
  }

  acceptRequest(request: FriendRequest) {
    this.friendRequestsService.accept(request.id);
    this.requests$ = this.friendRequestsService.getAllForUser(this.currentId$.getValue());
  }

  rejectRequest(request: FriendRequest) {
    this.friendRequestsService.reject(request.id);
    this.requests$ = this.friendRequestsService.getAllForUser(this.currentId$.getValue());
  }

}
