import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SwiperModule} from 'angular2-useful-swiper';

import {ShareModule} from '../share/share.module';
import { ActionNavBarComponent } from './action-nav-bar/action-nav-bar.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';
import { CardToPlayComponent } from './card-to-play/card-to-play.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { BoatNumberValidatorDirective } from './directive/boat-number-validator.directive';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { JoinComponent } from './join/join.component';
import { LayoutComponent } from './layout/layout.component';
import { MoveMapRemoteComponent } from './move-map-remote/move-map-remote.component';
import { PlaceBoatRemoteComponent } from './place-boat-remote/place-boat-remote.component';
import { PlayComponent } from './play/play.component';
import {PlayerRoutingModule} from './player-routing.module';
import { QuitGameComponent } from './quit-game/quit-game.component';
import { RegisterComponent } from './register/register.component';
import { RemoteComponent } from './remote/remote.component';
import { ResumeComponent } from './resume/resume.component';
import { SidenavComponent } from './sidenav/sidenav.component';

declare var chrome;

export function getChromeApi() {
  if (!chrome) {
    throw new Error('You don\'t run regatta in chrome browser');
  }

  return chrome;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PlayerRoutingModule,
    ShareModule,
    SwiperModule
  ],
  declarations: [
    GamesComponent,
    RegisterComponent,
    BoatNumberValidatorDirective,
    PlayComponent,
    CardPreviewComponent,
    ActionNavBarComponent,
    RemoteComponent,
    PlaceBoatRemoteComponent,
    MoveMapRemoteComponent,
    CardToPlayComponent,
    HomeComponent,
    LayoutComponent,
    QuitGameComponent,
    CreateGameComponent,
    SidenavComponent,
    JoinComponent,
    ResumeComponent
  ],
  providers: [
    {
      provide: 'chrome',
      useFactory: (getChromeApi)
    }
  ],
  entryComponents: [
    QuitGameComponent
  ]
})
export class PlayerModule {}
