import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="container-fluid text-center mt-3 w-25">
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" name="username" [(ngModel)]="username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" [(ngModel)]="password">
        </div>
        <div class="form-group">
          <input type="checkbox" class="form-check-input" id="keepIn" name="keepIn" [(ngModel)]="keepIn">
          <label class="form-check-label" for="keepIn">Stay signed in</label>
        </div>
        <button class="btn btn-outline-primary w-100 mt-2" (click)="signIn()">Sign In</button>
        <span class="mt-2">
          Don't have an account yet?
        </span><a (click)="signUp()" class="text-primary">Sign Up</a>
      </form>
    </div>
  `,
})
export class SignInComponent implements OnInit {
  public username: string;
  public password: string;
  public keepIn = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signIn() {
    if (this.username && this.password) {
      this.userService.signIn(this.username, this.password).subscribe((user: User | undefined) => {
        if (user) {
          UserService.currentId.next(user.id);
          if (this.keepIn) {
            localStorage.setItem('id', user.id.toString());
          } else {
            sessionStorage.setItem('id', user.id.toString());
          }
          this.toastr.success('Signed in!');
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Wrong username or password!');
        }
      });
    }
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

}
