import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../share/model/game';
import { User } from '../../share/model/user';
import * as _ from 'underscore/underscore';
import { Player } from '../../share/model/player';
import { UserService } from '../../share/service/user.service';

@Component({
  selector: 'app-player-summary',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss']
})
export class PlayerSummaryComponent implements OnInit {

  private _game: Game;

  public users: {user: User, player: Player}[];

  public constructor(private userService: UserService) { }

  public ngOnInit(): void {}

  @Input()
  public set game(value: Game) {
    this._game = value;

    if (!this._game) {
      return;
    }

    this.users = [];
    _.each(this.game.players, (p: Player) => {
      this.userService.findById(p.userId).subscribe(
        (user: User) => this.users.push({user: user, player: p})
      );
    });
  }

  public get game(): Game {
    return this._game;
  }
}
