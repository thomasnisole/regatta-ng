import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Game} from '../model/game';
import {AngularFireDatabase} from 'angularfire2/database';
import {deserialize, serialize} from 'json-typescript-mapper';
import {GameStatus} from '../model/game-status.enum';
import {LevelParserService} from './level-parser.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as _ from 'underscore/underscore';
import * as firebase from 'firebase/app';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class GameService {

  public constructor(private db: AngularFireDatabase, private levelParser: LevelParserService){ }

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
      .do((os: DataSnapshot) => console.log(os))
      .map((os: DataSnapshot) => deserialize(Game, os))
      .do((g: Game) => console.log(g));
  }

  public create(name: string, password: string): Observable<Game> {
    const game = new Game();
    game.name = name;
    game.password = password;
    delete game.id;
    delete game.board;

    return Observable.create(observer => {
      this.db
        .list('/games')
        .push(serialize(game))
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
          const gameSeria = serialize(completeGame);
          delete gameSeria.$key;

          console.log(gameSeria);

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
}
