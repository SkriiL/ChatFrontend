import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {SignUpComponent} from './pages/sign-in/sign-up.component';
import {HomeComponent} from './pages/home/home.component';
import {FriendsComponent} from './pages/friends/friends.component';
import {FriendRequestsService} from './services/friend-requests.service';
import {FriendRequestsComponent} from './pages/friend-requests/friend-requests.component';
import {ChatComponent} from './pages/chat/chat.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {InvitationComponent} from './components/invitation/invitation.component';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up/:id', component: SignUpComponent},
  {path: 'home', component: HomeComponent},
  {path: '', pathMatch: 'prefix', redirectTo: 'home'},
  {path: 'friends', component: FriendsComponent},
  {path: 'friend-requests', component: FriendRequestsComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'chat/:id', component: ChatComponent},
  {path: 'invitation/:id', component: InvitationComponent},
  {path: 'settings', component: SettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
