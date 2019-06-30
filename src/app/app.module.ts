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
import { HomeComponent } from './pages/home/home.component';
import { FriendsComponent } from './pages/friends/friends.component';
import {FriendsService} from './services/friends.service';
import {TypeaheadModule} from 'ngx-type-ahead';
import {FriendRequestsService} from './services/friend-requests.service';
import { FriendRequestsComponent } from './pages/friend-requests/friend-requests.component';
import { ChatComponent } from './pages/chat/chat.component';
import {ChatService} from './services/chat.service';
import { AllChatsComponent } from './pages/chat/all-chats.component';
import { ChatCardComponent } from './pages/chat/chat-card.component';
import {MessagesService} from './services/messages.service';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ChatWindowComponent } from './pages/chat/chat-window.component';
import { MessageComponent } from './components/message/message.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModal, NgbModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import { StartChatModalComponent } from './components/start-chat-modal/start-chat-modal.component';
import {ModalModule} from 'ngb-modal';
import { SettingsComponent } from './pages/settings/settings.component';
import { InvitationComponent } from './components/invitation/invitation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    FriendsComponent,
    FriendRequestsComponent,
    ChatComponent,
    AllChatsComponent,
    ChatCardComponent,
    DateFormatPipe,
    ChatWindowComponent,
    MessageComponent,
    StartChatModalComponent,
    SettingsComponent,
    InvitationComponent,
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
    PerfectScrollbarModule,
    ModalModule,
    NgbPopoverModule,
    NgbModule.forRoot(),
  ],
  providers: [
    UserService,
    FriendsService,
    FriendRequestsService,
    ChatService,
    MessagesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
