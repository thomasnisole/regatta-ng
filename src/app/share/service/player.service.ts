import { Injectable } from '@angular/core';
import {Game} from '../model/game';
import {User} from '../model/user';
import {AngularFireDatabase} from 'angularfire2/database';
import {Player} from '../model/player';
import {serialize} from 'json-typescript-mapper';
import {Boat} from '../model/boat';
import {Orientation} from '../model/orientation.enum';
import {PlayerStatus} from '../model/player-status.enum';
import {removeUndefined} from '../utils';

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

    this.db
      .list('/games/' + game.id + '/players/')
      .push(removeUndefined(serialize(player)));
  }

  public moveBoat(boat: Boat, deltaX: number, deltaY: number, deltaAngle: number) {
    boat.x += deltaX;
    boat.y += deltaY;
    boat.orientation += deltaAngle;

    if (boat.orientation > 270) {
      boat.orientation = Orientation.TOP;
    } else if (boat.orientation < 0) {
      boat.orientation = Orientation.LEFT;
    }
  }

  public startPlayer(player: Player, game: Game) {
    if (game.board.isInDeparture(player)) {
      player.status = PlayerStatus.WAITING_TO_PLAY;
    }

    return player.isStarted();
  }

  public update(player: Player, game: Game) {
    this.db
      .object('/games/' + game.id + '/players/' + player.id)
      .update(removeUndefined(serialize(player)));
  }
}
