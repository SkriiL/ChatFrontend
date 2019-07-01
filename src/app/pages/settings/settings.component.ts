import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/internal/operators';
import {User} from '../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  private currentId$ = UserService.currentId;
  public userPermission$ = this.userService.getSingleById(this.currentId$.getValue()).pipe(
    map((u: User) => u.permissions.user),
  );

  public formGroup = new FormGroup({
    link: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {
    this.fillForm();
  }

  fillForm() {
    const sub = this.userService.getSingleById(this.currentId$.getValue()).subscribe((u: User) => {
      this.formGroup.get('status').setValue(u.status);
      sub.unsubscribe();
    });
  }

  ngOnInit() {
  }

  createInvitationLink() {
    this.userService.invite().subscribe(l => {
      this.formGroup.get('link').setValue(l);
    });
  }

  copyLink() {
    const link = this.formGroup.get('link').value;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  setStatus() {
    const status = this.formGroup.get('status').value;
    const sub = this.userService.getSingleById(this.currentId$.getValue()).subscribe((u: User) => {
      if (u) {
        u.status = status;
        this.userService.edit(u);
        this.toastr.success('Status updated.');
        sub.unsubscribe();
      }
    });
  }

}
