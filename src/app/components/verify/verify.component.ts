import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/internal/operators';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-verify',
  template: `
  `,
})
export class VerifyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.userService.verifyEmail(id);
    this.router.navigateByUrl('/home');
    this.toastr.success('Email verified.');
  }

}
