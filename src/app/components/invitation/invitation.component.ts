import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-invitation',
  template: `
  `,
})
export class InvitationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.userService.activateInvitation(id).subscribe(res => {
      if (res === true) {
        this.router.navigate(['sign-up/' + id]);
        this.toastr.success('Invitation activated.');
        sessionStorage.setItem('invitation', id.toString());
      } else if (res === false) {
        this.router.navigate(['']);
        this.toastr.error('This link can be accessed one time only.');
      }
    });
  }

  ngOnInit() {
  }

}
