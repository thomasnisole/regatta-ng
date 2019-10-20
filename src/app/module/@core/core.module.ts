import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './service/user.service';
import {GameService} from './service/game.service';
import {PlayerService} from './service/player.service';
import {NgxsModule} from '@ngxs/store';
import {LevelService} from './service/level.service';
import {ObstacleService} from './service/obstacle.service';
import {BuoyService} from './service/buoy.service';
import {CheckLineService} from './service/check-line.service';
import {CardService} from './service/card.service';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot()
  ],
  providers: [
    BuoyService,
    CardService,
    CheckLineService,
    GameService,
    LevelService,
    ObstacleService,
    PlayerService,
    UserService
  ]
})
export class CoreModule {

  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
