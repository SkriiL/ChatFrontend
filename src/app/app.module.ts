import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {SignUpComponent} from './pages/sign-in/sign-up.component';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { VerifyComponent } from './components/verify/verify.component';
import { HomeComponent } from './pages/home/home.component';
import { FriendsComponent } from './pages/friends/friends.component';
import {FriendsService} from './services/friends.service';
import {TypeaheadModule} from 'ngx-type-ahead';
import {FriendRequestsService} from './services/friend-requests.service';
import { FriendRequestsComponent } from './pages/friend-requests/friend-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    VerifyComponent,
    HomeComponent,
    FriendsComponent,
    FriendRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TypeaheadModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    FriendsService,
    FriendRequestsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
