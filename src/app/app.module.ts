import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoiceComponent } from './choice/choice.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {ShareModule} from './share/share.module';
import {UserGuard} from './user.guard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SwiperModule} from 'angular2-useful-swiper';
import {ToastModule} from 'ng2-toastr';

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
  providers: [UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
