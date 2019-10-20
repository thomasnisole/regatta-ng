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
import {CurrentUserState} from './state/current-user/current-user.state';
import {environment} from '../../../environments/environment';
import {UserGuard} from './guard/user.guard';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './component/register/register.component';
import {CurrentPlayerState} from './state/current-player/current-player.state';
import {GamesComponent} from './component/games/games.component';
import { PlayComponent } from './component/play/play.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import {CurrentGameState} from './state/current-game/current-game.state';
import {NgxUsefulSwiperModule} from 'ngx-useful-swiper';
import {SetCurrentGameResolve} from './resolve/set-current-game.resolve';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {SetCurrentPlayerResolve} from './resolve/set-current-player.resolve';
import {CardPreviewComponent} from './component/card-preview/card-preview.component';
import {ActionNavBarComponent} from './component/action-nav-bar/action-nav-bar.component';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {MoveMapRemoteComponent} from './component/move-map-remote/move-map-remote.component';
import {RemoteComponent} from './component/remote/remote.component';

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
    RegisterComponent,
    RemoteComponent,
    ResumeComponent,
    SidenavComponent,
    PlayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPopoverModule,
    NgxsModule.forRoot(
      [
        CurrentGameState,
        CurrentPlayerState,
        CurrentUserState
      ],
      {
        developmentMode: !environment.production
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxUsefulSwiperModule,
    PlayerRoutingModule
  ],
  providers: [
    SetCurrentGameResolve,
    SetCurrentPlayerResolve,
    UserGuard
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class PlayerModule { }

