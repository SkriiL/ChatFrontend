import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/internal/operators';
import {User} from '../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  });

  constructor(
    private userService: UserService,
  ) { }

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

}
