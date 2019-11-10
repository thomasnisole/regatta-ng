import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './component/app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './module/@core/core.module';
import {SystemModule} from './module/@system/system.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {NgxTsSerializerModule} from 'ngx-ts-serializer';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {OrderModule} from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FilterPipeModule,
    NgxTsSerializerModule,
    OrderModule,
    SystemModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
