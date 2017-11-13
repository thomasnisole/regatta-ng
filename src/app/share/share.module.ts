import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import {AuthService} from './service/auth.service';
import {BoardService} from './service/board.service';
import {CardService} from './service/card.service';
import { CastSenderService } from './service/cast-sender.service';
import {GameFlowService} from './service/game-flow.service';
import {GameService} from './service/game.service';
import {LevelParserService} from './service/level-parser.service';
import {PlayerService} from './service/player.service';
import {UserService} from './service/user.service';

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
