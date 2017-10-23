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
import * as _ from 'underscore/underscore';
import {Observable} from 'rxjs/Observable';
import {CardService} from './card.service';
import {Point} from '../model/point';
import {BoardService} from './board.service';
import {Trajectory} from '../model/trajectory';
import { AbstractCard } from '../model/abstract-card';

@Injectable()
export class PlayerService {

  public constructor(
    private db: AngularFireDatabase,
    private cardService: CardService,
    private boardService: BoardService) { }

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

  public dropCards(player: Player, game: Game, cards: AbstractCard[]): void {
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

  public previewCard(game: Game, player: Player, card: AbstractCard): boolean {
    const previewedCard = _.sortBy(
      _.filter(player.cards, (c: AbstractCard) => c.previewPossibilities), (c: AbstractCard) => c.previewOrder
    );
    card.previewOrder = previewedCard.length;
    let departure: Point;
    const indexPossibility = _.last(card.previewPossibilities);

    if (previewedCard.length > 1 || (previewedCard.length === 1 && card.previewPossibilities.length > 1)) {
      let lastCard: AbstractCard = null;
      if (card.previewPossibilities.length > 1) {
        lastCard = card;
      } else {
        lastCard = previewedCard[previewedCard.length - 2];
      }
      const b: Boat = _.clone(player.boat);
      b.orientation = card.lastOrientationDeparture = card.lastOrientationArriving = lastCard.lastOrientationArriving;
      const arriving = this.cardService.findBoatFromArriving(lastCard, b);
      b.x = arriving.x;
      b.y = arriving.y;
      departure = this.cardService.findDepartureFromBoat(b);
    } else {
      departure = this.cardService.findDepartureFromBoat(player.boat);
      card.lastOrientationDeparture = card.lastOrientationArriving = player.boat.orientation;
    }

    card.lastXDeparture = card.lastXArriving = departure.x;
    card.lastYDeparture = card.lastYArriving = departure.y;

    _.each(card.possibilities[indexPossibility].moves, (move: any) => {
      if (card.lastOrientationDeparture === Orientation.TOP) {
        card.xArriving[card.xArriving.length - 1] -= move.x;
        card.yArriving[card.yArriving.length - 1] -= move.y;
      } else if (card.lastOrientationDeparture === Orientation.BOTTOM) {
        card.xArriving[card.xArriving.length - 1] += move.x;
        card.yArriving[card.yArriving.length - 1] += move.y;
      } else if (card.lastOrientationDeparture === Orientation.LEFT) {
        card.xArriving[card.xArriving.length - 1] -= move.y;
        card.yArriving[card.yArriving.length - 1] += move.x;
      } else if (card.lastOrientationDeparture === Orientation.RIGHT) {
        card.xArriving[card.xArriving.length - 1] += move.y;
        card.yArriving[card.yArriving.length - 1] -= move.x;
      }
    });

    card.orientationArriving[card.orientationArriving.length - 1] += card.possibilities[indexPossibility].rotate;
    if (card.lastOrientationArriving > 270) {
      card.orientationArriving[card.orientationArriving.length - 1] = Orientation.TOP;
    } else if (card.lastOrientationArriving < 0) {
      card.orientationArriving[card.orientationArriving.length - 1] = Orientation.LEFT;
    }

    const trajectories: Trajectory[] = this.cardService.findAllPossibillityTrajectories(
      player.boat, card,
      card.previewPossibilities.length - 1
    );
    const result = this.boardService.checkCardMove(game, trajectories, player.boat);
    if (!card.previewTrajectories) {
      card.previewTrajectories = [];
    }
    card.previewTrajectories = card.previewTrajectories.concat(trajectories);

    return result;
  }

  public clearPreview(player: Player): void {
    _.each(player.cards, (card: AbstractCard) => {
      this.cardService.clearMoveCard(card);
    });
  }

  public play(player: Player, game: Game): void {
    const cards = _.sortBy(_.filter(player.cards, (c: AbstractCard) => c.previewPossibilities), 'previewOrder');
    const trajectories: Trajectory[] = _.flatten(_.map(cards, (c: AbstractCard) => c.previewTrajectories));

    _.each(trajectories, (t: Trajectory) => {
      if (player.checkLines.length > 0 && t.intersectLine(player.checkLines[0])) {
        player.checkLines.shift();
      }
    });

    const lastCard: AbstractCard = _.last(cards);
    const bArriving = _.clone(player.boat);
    bArriving.orientation = lastCard.lastOrientationArriving;
    const arriving: Point = this.cardService.findBoatFromArriving(lastCard, bArriving);
    player.boat.x = arriving.x;
    player.boat.y = arriving.y;
    player.boat.orientation = lastCard.lastOrientationArriving;

    if (!game.droppedCards) {
      game.droppedCards = [];
    }
    game.droppedCards = game.droppedCards.concat(cards);
    player.cards = _.reject(player.cards, (c: AbstractCard) => c.previewOrder);
    _.each(cards, (c: AbstractCard) => this.cardService.clearMoveCard(c));
    player.status = PlayerStatus.MOVE_PLAYED;

    this.clearPreview(player);
  }

  public trap(player: Player, game: Game): void {
    const cards = _.filter(player.cards, (c: AbstractCard) => c.playerTrap);
    if (!game.droppedCards) {
      game.droppedCards = [];
    }
    game.droppedCards = game.droppedCards.concat(cards);
    player.cards = _.reject(player.cards, (c: AbstractCard) => c.playerTrap);
    _.each(cards, (c: AbstractCard) => this.cardService.clearTrapCard(c));
    player.status = PlayerStatus.TERMINATED;
  }

  public update(player: Player, game: Game) {
    this.db
      .object('/games/' + game.id + '/players/' + player.id)
      .update(removeUndefined(serialize(player)));
  }
}
