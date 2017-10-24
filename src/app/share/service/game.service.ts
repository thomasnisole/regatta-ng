import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Game} from '../model/game';
import {AngularFireDatabase} from 'angularfire2/database';
import {deserialize, serialize} from 'json-typescript-mapper';
import { GameStatus } from '../model/game-status.enum';
import {LevelParserService} from './level-parser.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as _ from 'underscore/underscore';
import * as firebase from 'firebase/app';
import DataSnapshot = firebase.database.DataSnapshot;
import {removeUndefined} from '../utils';
import {environment} from '../../../environments/environment';
import {Player} from '../model/player';
import {PlayerStatus} from '../model/player-status.enum';

@Injectable()
export class GameService {

  public constructor(
    private db: AngularFireDatabase,
    private levelParser: LevelParserService) { }

  public findAllWaiting(): Observable<Game[]> {
    return this.db
      .list('/games', {
        query: {
          orderByChild: 'status',
          equalTo: GameStatus.WAITING
        }
      })
      .map((os: DataSnapshot) => _.map(os, (o) => deserialize(Game, o)));
  }

  public findById(id: string): Observable<Game> {
    return this.db
      .object('/games/' + id)
      .map((os: DataSnapshot) => deserialize(Game, os));;
  }

  public create(name: string, password: string): Observable<Game> {
    const game = new Game();
    game.name = name;
    game.password = password;

    return Observable.create(observer => {
      this.db
        .list('/games')
        .push(removeUndefined(serialize(game)))
        .then((o: DataSnapshot) => {
          game.id = o.key;
          observer.next(game);
        });
    });
  }

  public start(game: Game): Observable<Game> {
    return Observable.create(observer => {
      this.levelParser
        .parse(game)
        .subscribe(
        (completeGame: Game) => {
          const gameSeria = removeUndefined(serialize(completeGame));

          this.db
            .object('/games/' + completeGame.id)
            .set(gameSeria)
            .then(() => {
              observer.next(completeGame);
            });
        }
      );
    });
  }

  public moveMap(game: Game, deltaX: number, deltaY: number): void {
    game.board.x += deltaX;
    game.board.y += deltaY;
  }

  public zoomMap(game: Game, deltaZoom: number): void {
    game.board.zoom += deltaZoom;
  }

  public resetOnCurrentPlayer(game: Game): void {
    const player: Player = game.getCurrentPlayer();
    game.board.x =
      player.boat.x - (game.board.width / environment.board.caseDimensions.width) / 2;
    game.board.x *= environment.board.caseDimensions.width;
    game.board.y =
      player.boat.y - (game.board.height / environment.board.caseDimensions.height) / 2;
    game.board.y *= environment.board.caseDimensions.height;
    game.board.zoom = environment.board.viewboxHeight;
  }

  public changeCurrentPlayer(nextPlayerId: string, game: Game): void {
    if (_.filter(game.players, (p: Player) => !p.arrivingOrder).length === 0) {
      game.status = GameStatus.FINISHED;
      return;
    }

    let nextPlayer: Player = game.getPlayerByUserId(nextPlayerId);
    while (nextPlayer.isTrap || nextPlayer.arrivingOrder > 0) {
      nextPlayer.isTrap = void 0;
      nextPlayer = game.getPlayerByUserId(nextPlayer.nextPlayer);
    }
    game.currentPlayer = nextPlayer.userId;
    game.getCurrentPlayer().status = PlayerStatus.WAITING_TO_PLAY;
  }

  public update(game: Game): void {
    this.db.object('/games/' + game.id).update(removeUndefined(serialize(game)));
  }
}
