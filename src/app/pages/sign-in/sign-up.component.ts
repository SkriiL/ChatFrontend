import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  template: `
    <div class="container-fluid text-center mt-3 w-25">
      <form>
        <div class="form-group" [formGroup]="formGroup">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" name="username" formControlName="username">
        </div>
        <div class="form-group" [formGroup]="formGroup">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" formControlName="password">
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
  public formGroup = new FormGroup({
    username: new FormControl('',  ),
    password: new FormControl('', ),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    const idSes = sessionStorage.getItem('invitation');
    const idUrl = this.route.snapshot.paramMap.get('id');
    if (idSes !== idUrl) {
      this.toastr.error('Security error.');
      this.router.navigate(['']);
    } else {
      sessionStorage.clear();
    }
  }

  ngOnInit() {
  }

  signUp() {
    const username = this.formGroup.get('username').value;
    const password = this.formGroup.get('password').value;
    console.log(password);
    if (!username || !password) {
      this.toastr.error('All fields need to be filled.');
      return;
    }
    this.userService.create(username, password).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if (res[i] === 0) {
          this.toastr.success('Signed Up.');
          this.router.navigate(['/home']);
        } else {
          if (res[i] === 1) {
            this.toastr.error('This username exists already.');
          }
        }
      }
    });
  }

  signIn() {
    this.router.navigate(['/sign-in']);
  }

}
