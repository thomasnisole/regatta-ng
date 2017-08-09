import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameService} from './service/game.service';
import {UserService} from './service/user.service';
import {PlayerService} from './service/player.service';
import {AuthService} from './service/auth.service';
import {LevelParserService} from './service/level-parser.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    GameService,
    LevelParserService,
    PlayerService,
    UserService
  ]
})
export class ShareModule { }
