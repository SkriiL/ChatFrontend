import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  template: `
    <div class="container-fluid text-center mt-3 w-25">
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" name="username" [(ngModel)]="username">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" class="form-control" id="email" name="email" [(ngModel)]="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="text" class="form-control" id="password" name="password" [(ngModel)]="password">
        </div>
        <button class="btn btn-outline-primary w-100 mt-2" (click)="signUp()">Sign Up</button>
        <span class="mt-2">
          Already have an acccount? <a (click)="signIn()" class="text-primary">Sign In</a>
        </span>
      </form>
    </div>
  `,
})
export class SignUpComponent implements OnInit {
  public username: string;
  public email: string;
  public password: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.userService.create(this.username, this.email, this.password);
  }

  signIn() {
    this.router.navigate(['/sign-in']);
  }

}
