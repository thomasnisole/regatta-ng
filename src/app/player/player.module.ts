import { window } from 'rxjs/operator/window';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerRoutingModule} from './player-routing.module';
import { GamesComponent } from './games/games.component';
import {ShareModule} from '../share/share.module';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';
import { BoatNumberValidatorDirective } from './directive/boat-number-validator.directive';
import { PlayComponent } from './play/play.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';
import { ActionNavBarComponent } from './action-nav-bar/action-nav-bar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RemoteComponent } from './remote/remote.component';
import { PlaceBoatRemoteComponent } from './place-boat-remote/place-boat-remote.component';
import { MoveMapRemoteComponent } from './move-map-remote/move-map-remote.component';
import { CardToPlayComponent } from './card-to-play/card-to-play.component';
import {SwiperModule} from 'angular2-useful-swiper';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { QuitGameComponent } from './quit-game/quit-game.component';
import { CreateGameComponent } from './create-game/create-game.component';
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
    SidenavComponent
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
