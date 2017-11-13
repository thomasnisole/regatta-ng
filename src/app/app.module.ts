import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SwiperModule} from 'angular2-useful-swiper';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ToastModule} from 'ng2-toastr';
import {environment} from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoiceComponent } from './choice/choice.component';
import {ShareModule} from './share/share.module';
import {UserGuard} from './user.guard';

@NgModule({
  declarations: [
    AppComponent,
    ChoiceComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserModule,
    NgbModule.forRoot(),
    ShareModule,
    SwiperModule,
    ToastModule.forRoot()
  ],
  providers: [
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
