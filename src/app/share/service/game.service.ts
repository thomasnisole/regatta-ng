import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {deserialize, serialize} from 'json-typescript-mapper';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import * as _ from 'underscore/underscore';
import {Game} from '../model/game';
import { GameStatus } from '../model/game-status.enum';
import {LevelParserService} from './level-parser.service';
import DataSnapshot = firebase.database.DataSnapshot;

import {Player} from '../model/player';
import {PlayerStatus} from '../model/player-status.enum';
import { User } from '../model/user';
import {removeUndefined} from '../utils';
import { UserService } from './user.service';

@Injectable()
export class GameService {

  public constructor(
    private db: AngularFireDatabase,
    private levelParser: LevelParserService) { }

  public findAllWaiting(): Observable<Game[]> {
    return this.db
      .list('/games', (ref: firebase.database.Reference) => ref.orderByChild('status').equalTo(GameStatus.WAITING))
      .snapshotChanges()
      .map((os: any) => _.map(os, (o) => {
        const g: Game = deserialize(Game, o.payload.val());
        g.id = o.payload.key;

        return g;
      }));
  }

  public findAllResuming(user: User): Observable<Game[]> {
    return this.db
    .list('/games', (ref: firebase.database.Reference) => ref.orderByChild('status').equalTo(GameStatus.STARTED))
    .snapshotChanges()
    .map((os: any) => _.map(os, (o) => {
      const g: Game = deserialize(Game, o.payload.val());
      g.id = o.payload.key;

      return g;
    }))
    .map((games: Game[]) => _.filter(games, (game: Game) => _.some(game.players, (p: Player) => p.userId === user.id)));
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

  public changeCurrentPlayer(nextPlayerId: string, game: Game): void {
    const playersNotArriving = _.filter(game.players, (p: Player) => !p.arrivingOrder);
    if (playersNotArriving.length === 1) {
      playersNotArriving[0].arrivingOrder = game.players.length;
      game.status = GameStatus.FINISHED;
      this.calculateStatistics(game);
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
    game.droppedCards = game.droppedCards.concat(player.cards);
    const previousPlayer: Player = _.find(game.players, (p: Player) => p.nextPlayer === player.userId);
    previousPlayer.nextPlayer = player.nextPlayer;

    const index = _.findIndex(game.players, (p: Player) => p.userId === player.userId);
    game.players.splice(index, 1);

    if (game.players.length === 1) {
      this.delete(game);
    }

    if (game.currentPlayer === player.userId) {
      this.changeCurrentPlayer(player.nextPlayer, game);
    } else {
      const playersNotArriving = _.filter(game.players, (p: Player) => !p.arrivingOrder);
      if (playersNotArriving.length === 1) {
        playersNotArriving[0].arrivingOrder = game.players.length;
        game.status = GameStatus.FINISHED;
        this.calculateStatistics(game);
      }
    }

    this.update(game);
  }

  private calculateStatistics(game: Game): void {
    const firstPlayerArrived: Player = _.filter(game.players, (p: Player) => p.arrivingOrder = 0);
    console.log(this.db.object('/users/' + firstPlayerArrived.userId + '/'));
  }
}
