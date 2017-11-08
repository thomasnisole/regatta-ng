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
      .list('/games', (ref: firebase.database.Reference) =>
        ref.orderByChild('status').equalTo(GameStatus.WAITING)
      ).snapshotChanges()
      .map((os: any) => _.map(os, (o) => {
        const g: Game = deserialize(Game, o.payload.val());
        g.id = o.payload.key;

        return g;
      }));
  }

  public findById(id: string): Observable<Game> {
    return this.db
      .object('/games/' + id)
      .snapshotChanges()
      .do((os: any) => {
        if (!os) {
          throw Error('No game found');
        }
      })
      .map((os: any) => {
        const g: Game = deserialize(Game, os.payload.val());
        g.id = os.payload.key;

        return g;
      });
  }

  public create(name: string, password: string, author: string): Observable<string> {
    const game = new Game();
    game.name = name;
    game.password = password;
    game.author = author;

    return Observable.create(observer => {
      this.db
        .list('/games')
        .push(removeUndefined(serialize(game)))
        .then((os: DataSnapshot) => observer.next(os.key));
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
    const playersNotArriving = _.filter(game.players, (p: Player) => !p.arrivingOrder);
    if (playersNotArriving.length === 1) {
      playersNotArriving[0].arrivingOrder = game.players.length;
      game.status = GameStatus.FINISHED;
      return;
    }

    let nextPlayer: Player = game.getPlayerByUserId(nextPlayerId);
    while (nextPlayer.isTrapped || nextPlayer.arrivingOrder > 0) {
      nextPlayer.isTrapped = void 0;
      nextPlayer = game.getPlayerByUserId(nextPlayer.nextPlayer);
    }
    game.currentPlayer = nextPlayer.userId;
    game.getCurrentPlayer().status = PlayerStatus.WAITING_TO_PLAY;
  }

  public update(game: Game): void {
    this.db.object('/games/' + game.id).update(removeUndefined(serialize(game)));
  }

  public delete(game: Game): void {
    this.db.object('/games/' + game.id).remove();
  }

  public deletePlayer(player: Player, game: Game): void {
    const nextPlayer: string = player.nextPlayer;

    game.droppedCards = game.droppedCards.concat(player.cards);
    const previousPlayer: Player = _.find(game.players, (p: Player) => p.nextPlayer === player.userId);
    previousPlayer.nextPlayer = player.nextPlayer;

    const index = _.findIndex(game.players, (p: Player) => p.userId === player.userId);
    game.players.splice(index, 1);

    if (game.currentPlayer === player.userId) {
      this.changeCurrentPlayer(player.nextPlayer, game);
    } else {
      const playersNotArriving = _.filter(game.players, (p: Player) => !p.arrivingOrder);
      if (playersNotArriving.length === 1) {
        playersNotArriving[0].arrivingOrder = game.players.length;
        game.status = GameStatus.FINISHED;
      }
    }

    this.update(game);
  }
}
