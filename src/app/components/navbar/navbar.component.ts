import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public currentId = UserService.currentId;

  constructor(
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
  }

  signOut() {
    localStorage.clear();
    sessionStorage.clear();
    UserService.currentId.next(-1);
    this.toastr.success('Signed out.')
  }

}
