import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRepository} from './repository/user.repository';
import {GameService} from './service/game.service';
import {PlayerService} from './service/player.service';
import {NgxsModule} from '@ngxs/store';
import {LevelRepository} from './repository/level.repository';
import {ObstacleRepository} from './repository/obstacle.repository';
import {CardService} from './service/card.service';
import {BuoyRepository} from './repository/buoy.repository';
import {CardRepository} from './repository/card.repository';
import {CheckLineRepository} from './repository/check-line.repository';
import {PlayerRepository} from './repository/player.repository';
import {GameRepository} from './repository/game.repository';
import {BuoyService} from './service/buoy.service';
import {CheckLineService} from './service/check-line.service';
import {UserService} from './service/user.service';
import {BoardService} from './service/board.service';
import {CurrentGameIdState} from './state/current-game-id/current-game-id.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {CurrentUserUidState} from '../player/state/current-user-uid/current-user-uid.state';
import {ObstacleService} from './service/obstacle.service';

const REPOSITORIES = [
  BuoyRepository,
  CardRepository,
  CheckLineRepository,
  GameRepository,
  LevelRepository,
  ObstacleRepository,
  PlayerRepository,
  UserRepository
];

const SERVICES = [
  BoardService,
  BuoyService,
  CardService,
  CheckLineService,
  GameService,
  ObstacleService,
  PlayerService,
  UserService
];

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot(
      [
        CurrentGameIdState
      ],
      {
        developmentMode: true
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    ...REPOSITORIES,
    ...SERVICES
  ]
})
export class CoreModule {

  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
