import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameService} from './service/game.service';
import {UserService} from './service/user.service';
import {PlayerService} from './service/player.service';
import {AuthService} from './service/auth.service';
import {LevelParserService} from './service/level-parser.service';
import {GameFlowService} from './service/game-flow.service';
import { CardComponent } from './card/card.component';
import {CardService} from './service/card.service';
import {BoardService} from './service/board.service';
import { CastSenderService } from './service/cast-sender.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ],
  providers: [
    AuthService,
    BoardService,
    CardService,
    GameService,
    GameFlowService,
    LevelParserService,
    PlayerService,
    UserService,
    CastSenderService
  ]
})
export class ShareModule { }
