import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {SignUpComponent} from './pages/sign-in/sign-up.component';
import {VerifyComponent} from './components/verify/verify.component';
import {HomeComponent} from './pages/home/home.component';
import {FriendsComponent} from './pages/friends/friends.component';
import {FriendRequestsService} from './services/friend-requests.service';
import {FriendRequestsComponent} from './pages/friend-requests/friend-requests.component';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'verify/:id', component: VerifyComponent},
  {path: 'home', component: HomeComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'friend-requests', component: FriendRequestsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
