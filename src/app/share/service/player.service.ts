import { Injectable } from '@angular/core';
import {Game} from '../model/game';
import {User} from '../model/user';
import {AngularFireDatabase} from 'angularfire2/database';
import {Player} from '../model/player';
import {serialize} from 'json-typescript-mapper';
import {Boat} from '../model/boat';
import {Orientation} from '../model/orientation.enum';
import {PlayerStatus} from '../model/player-status.enum';

@Injectable()
export class PlayerService {

  public constructor(private db: AngularFireDatabase) { }

  public create(game: Game, user: User, boatNumber: number, color: any) {
    const player = new Player();
    player.name = user.displayName;
    player.userId = user.id;
    player.status = PlayerStatus.WAITING_TO_START;

    player.boat = new Boat();
    player.boat.color = color.hexa;
    player.boat.boatNumber = boatNumber;
    player.boat.orientation = Orientation.TOP;
    player.boat.x = 0;
    player.boat.y = 0;
    player.boat.width = 0;
    player.boat.height = 0;

    this.db.list('/games/' + game.id + '/players/').push(serialize(player));
  }
}
