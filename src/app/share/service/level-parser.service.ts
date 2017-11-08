import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Game} from '../model/game';
import {Board} from '../model/board';
import * as firebase from 'firebase/app';
import DataSnapshot = firebase.database.DataSnapshot;
import {Buoy} from '../model/buoy';
import {Line} from '../model/line';
import * as _ from 'underscore/underscore';
import {Point} from '../model/point';
import {Rectangle} from '../model/rectangle';
import {SeaElement} from '../model/sea-element';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Player} from '../model/player';
import {environment} from '../../../environments/environment';
import {GameStatus} from '../model/game-status.enum';
import { AbstractCard } from '../model/abstract-card';
import { cardConverter } from '../converter/card-converter';

@Injectable()
export class LevelParserService {

  private checkLines: Line[] = [];

  public constructor(private db: AngularFireDatabase) { }

  public parse(game: Game): Observable<Game> {
    return this.db.object('/game-types/level1')
      .valueChanges()
      .map(
        (data: any) => {
          game.board = new Board();
          game.board.x = 0;
          game.board.y = 0;
          game.board.width = 0;
          game.board.height = environment.board.viewboxHeight;
          game.board.zoom = environment.board.viewboxHeight;
          game.currentPlayer = game.players[0].userId;
          game.board.buoys = [];
          game.board.seaElements = [];

          const rect: Rectangle = new Rectangle();
          rect.x = data.board.departureArea.x;
          rect.y = data.board.departureArea.y;
          rect.width = data.board.departureArea.width;
          rect.height = data.board.departureArea.height;
          game.board.departureArea = rect;

          this.makeLineBuoys(game.board, data.board.departure);

          _.each(data.board.buoys, (buoy: any) => game.board.buoys.push(this.makeBuoy(buoy)));
          _.each(data.board.seaElements, (seaElement: any) => game.board.seaElements.push(this.makeSeaElement(seaElement)));
          game.cards = [];
          _.each(data.board.cardTypes, (cardType: any) => {
            for (let i = 0; i < cardType.count; i++) {
              game.cards.push(this.makeCard(cardType));
            }
          });
          game.cards = _.shuffle(game.cards);

          this.makeLineBuoys(game.board, data.board.arrival);

          game.players = _.shuffle(game.players);
          let previousPlayer: Player = _.last(game.players);
          _.each(game.players, (player: Player) => {
            player.boat.x = game.board.departureArea.x;
            player.boat.y = game.board.departureArea.y;
            player.boat.width = data.board.boatWidth;
            player.boat.height = data.board.boatLength;
            player.boat.orientation = data.board.boatOrientation;
            player.checkLines = this.checkLines.slice();
            player.cards = game.cards.splice(0, environment.cardsCountPerPlayer);
            previousPlayer.nextPlayer = player.userId;
            previousPlayer = player;
          });

          game.status = GameStatus.STARTED;

          return game;
        }
      );
  }

  private makeLineBuoys(board: Board, line: any): void {
    const buoy1: Buoy = this.makeBuoy(line.buoy1);
    const buoy2: Buoy = this.makeBuoy(line.buoy2);

    this.checkLines.push(this.makeLine(buoy1, buoy2));

    board.buoys.push(buoy1);
    board.buoys.push(buoy2);
  }

  private makeBuoy(data: any): Buoy {
    const buoy: Buoy = new Buoy();
    buoy.x = data.x;
    buoy.y = data.y;
    buoy.color = data.color;
    buoy.order = 0;

    if (data.checkLines) {
      _.each(data.checkLines, (checkLine: any) => {
        const pA: Point = new Point();
        pA.x = checkLine.pointA.x;
        pA.y = checkLine.pointA.y;

        const pB: Point = new Point();
        pB.x = checkLine.pointB.x;
        pB.y = checkLine.pointB.y;

        this.checkLines.push(this.makeLine(pA, pB));
      });
    }

    return buoy;
  }

  private makeLine(pointA: Point, pointB: Point): Line {
    const line: Line = new Line();
    line.pointA = pointA;
    line.pointB = pointB;

    return line;
  }

  private makeSeaElement(data: any): SeaElement {
    const seaElement: SeaElement = new SeaElement();
    seaElement.x = data.x;
    seaElement.y = data.y;
    seaElement.width = data.width;
    seaElement.height = data.height;
    seaElement.heightCoefficient = data.coefHeight;
    seaElement.src = data.src;

    return seaElement;
  }

  private makeCard(data: any): AbstractCard {
    return cardConverter.convertCard(data);
  }
}
