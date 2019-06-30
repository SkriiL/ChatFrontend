import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {FriendsService} from '../../services/friends.service';
import {FriendRequestsService} from '../../services/friend-requests.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public currentId$ = UserService.currentId;

  public requestClass = 'nav-link text-light';

  constructor(
    private toastr: ToastrService,
    private friendsService: FriendsService,
    private friendRequestsService: FriendRequestsService,
    private router: Router,
    private userService: UserService,
  ) {
    this.friendRequestsService.newFriendRequest().subscribe(id => {
      if (id === this.currentId$.getValue()) {
        this.toastr.info('You got a new friend request.');
        this.requestClass = 'nav-link text-primary';
      }
    });
    this.friendRequestsService.getAllForUser(this.currentId$.getValue()).subscribe(fr => {
      if (fr && fr.length > 0) {
        this.requestClass = 'nav-link text-primary';
      }
    });

  }

  ngOnInit() {
  }

  signOut() {
    localStorage.clear();
    sessionStorage.clear();
    UserService.currentId.next(-1);
    this.requestClass = 'nav-link text-light';
    this.toastr.success('Signed out.');
    this.router.navigate(['/']);
  }

  checkPermissions(permission) {
    const sub = this.userService.getSingleById(this.currentId$.getValue()).subscribe((u: User) => {
      if (permission === 'chat' && !u.permissions.chat) {
        this.toastr.error('You do not have the permissions to do that.');
        this.router.navigate(['']);
        return sub.unsubscribe();
      }
      if (permission === 'friends' && !u.permissions.friends) {
        this.toastr.error('You do not have the permissions to do that.');
        this.router.navigate(['']);
        return sub.unsubscribe();
      }
      sub.unsubscribe();
    });
  }
}
