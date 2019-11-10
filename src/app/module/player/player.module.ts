import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerRoutingModule} from './player-routing.module';
import {LayoutComponent} from './component/layout/layout.component';
import {HomeComponent} from './component/home/home.component';
import {JoinComponent} from './component/join/join.component';
import {ResumeComponent} from './component/resume/resume.component';
import {CreateGameComponent} from './component/create-game/create-game.component';
import {SidenavComponent} from './component/sidenav/sidenav.component';
import {LoginComponent} from './component/login/login.component';
import {NgxsModule} from '@ngxs/store';
import {UserGuard} from './guard/user.guard';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './component/register/register.component';
import {GamesComponent} from './component/games/games.component';
import {PlayComponent} from './component/play/play.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {CardPreviewComponent} from './component/card-preview/card-preview.component';
import {ActionNavBarComponent} from './component/action-nav-bar/action-nav-bar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MoveMapRemoteComponent} from './component/move-map-remote/move-map-remote.component';
import {RemoteComponent} from './component/remote/remote.component';
import {CardsComponent} from './component/cards/cards.component';
import {CardComponent} from './component/card/card.component';
import {PlaceBoatRemoteComponent} from './component/place-boat-remote/place-boat-remote.component';
import {ModeState} from './state/mode/mode.state';
import {CurrentUserUidState} from './state/current-user-uid/current-user-uid.state';
import {ShareModule} from '../@share/share.module';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1
};

@NgModule({
  declarations: [
    ActionNavBarComponent,
    CardPreviewComponent,
    ConfirmDialogComponent,
    CreateGameComponent,
    GamesComponent,
    HomeComponent,
    JoinComponent,
    LayoutComponent,
    LoginComponent,
    MoveMapRemoteComponent,
    PlaceBoatRemoteComponent,
    RegisterComponent,
    RemoteComponent,
    ResumeComponent,
    SidenavComponent,
    PlayComponent,
    CardsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxsModule.forFeature(
      [
        CurrentUserUidState,
        ModeState
      ]
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    PlayerRoutingModule,
    ShareModule,
    SwiperModule
  ],
  providers: [
    UserGuard,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class PlayerModule { }

