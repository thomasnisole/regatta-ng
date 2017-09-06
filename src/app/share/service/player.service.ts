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
import {Card} from '../model/card';
import * as _ from 'underscore/underscore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlayerService {

  public constructor(private db: AngularFireDatabase) { }

  public create(game: Game, user: User, boatNumber: number, color: any): Observable<Player> {
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

    return Observable.create((observer) => {
      this.db
        .list('/games/' + game.id + '/players/')
        .push(removeUndefined(serialize(player)))
        .then(() => {
          observer.next(player);
        });
    });
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

  public tack(player: Player, degres: number): void {
    this.moveBoat(player.boat, 0, 0, degres);
    player.status = PlayerStatus.TERMINATED;
  }

  public dropCards(player: Player, game: Game, cards: Card[]): void {
    player.cards = _.difference(player.cards, cards);

    if (!game.droppedCards) {
      game.droppedCards = [];
    }
    game.droppedCards = game.droppedCards.concat(cards);
  }

  public takeCards(player: Player, game: Game, nbrCard: number): void {
    if (nbrCard >= game.cards.length) {
      const shuffledCards = _.shuffle(game.droppedCards);
      game.cards = game.cards.concat(shuffledCards);
      game.droppedCards = [];
    }

    player.cards = player.cards.concat(game.cards.splice(0, nbrCard));
    player.status = PlayerStatus.TERMINATED;
  }

  public update(player: Player, game: Game) {
    this.db
      .object('/games/' + game.id + '/players/' + player.id)
      .update(removeUndefined(serialize(player)));
  }
}
