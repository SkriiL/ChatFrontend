import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {SignUpComponent} from './pages/sign-in/sign-up.component';
import {UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { VerifyComponent } from './components/verify/verify.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    VerifyComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
