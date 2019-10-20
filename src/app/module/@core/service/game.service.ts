import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';
import {from, Observable} from 'rxjs';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {filter, first, map, mergeMap, tap, toArray} from 'rxjs/operators';
import {GameStatus} from '../model/game-status.enum';
import {User} from '../model/user.model';
import {LevelService} from './level.service';
import {BuoyService} from './buoy.service';
import {Level} from '../model/level.model';
import {Buoy} from '../model/buoy.model';
import {Board} from '../model/board.model';
import {environment} from '../../../../environments/environment';
import {ObstacleService} from './obstacle.service';
import {CheckLineService} from './check-line.service';
import {Obstacle} from '../model/obstacle.model';
import {CheckLine} from '../model/check-line.model';
import {Card} from '../model/card.model';
import {cloneDeep, shuffle} from 'lodash';
import {CardService} from './card.service';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class GameService {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService,
                     private levelService: LevelService,
                     private buoyService: BuoyService,
                     private obstacleService: ObstacleService,
                     private checkLineService: CheckLineService,
                     private cardService: CardService) {}

  public findById(id: string): Observable<Game> {
    return this.dataService.findOne(`/games/${id}`).pipe(
      map((data: {id: string}) => this.deserializer.deserialize(Game, data))
    );
  }

  public findAllWaiting(user: User): Observable<Game[]> {
    return this.dataService.findAll('/games', [{field: 'status', operator: '==', value: GameStatus.WAITING}]).pipe(
      mergeMap((datas: {id: string}[]) => from(datas).pipe(
        map((data: {id: string}) => this.deserializer.deserialize(Game, data)),
        filter((game: Game) => game.userUids.indexOf(user.uid) === -1),
        toArray()
      ))
    );
  }

  public findAllResuming(user: User): Observable<Game[]> {
    return this.dataService.findAll(
      '/games',
      [{field: 'userUids', operator: 'array-contains', value: user.uid}]
    ).pipe(
      mergeMap((datas: {id: string}[]) => from(datas).pipe(
        map((data: {id: string}) => this.deserializer.deserialize(Game, data)),
        toArray()
      ))
    );
  }

  public create(game: Game): Observable<string> {
    return this.dataService.add('/games', this.serializer.serialize(game));
  }

  public update(game: Game): Observable<void> {
    return this.dataService.update(`/games/${game.id}`, this.serializer.serialize(game));
  }

  public delete(game: Game): Observable<void> {
    return  this.dataService.delete(`/games/${game.id}`);
  }

  public newGame(game: Game): Observable<string> {
    game.status = GameStatus.WAITING;

    let checkLineCount: number = 0;

    return this.levelService.findById('hqD1b6eS8B0gvLwRB6i1').pipe(
      first(),
      tap((level: Level) => game.board = new Board({
        x: 0,
        y: 0,
        width: 0,
        height: environment.board.viewboxHeight,
        zoom: environment.board.viewboxHeight,
        departureArea: level.departureArea,
        boatOrientation: level.boatOrientation
      })),
      mergeMap((level: Level) => this.create(game).pipe(
        mergeMap((gameId: string) => this.makeLineBuoy([level.departure.buoy1, level.departure.buoy2], gameId, checkLineCount)),
        mergeMap((gameId: string) => from(level.buoys.sort((a: Buoy, b: Buoy) => a.order - b.order)).pipe(
          tap((buoy: Buoy) => buoy.gameId = gameId),
          mergeMap((buoy: Buoy) => this.buoyService.create(buoy).pipe(
            mergeMap(() => buoy.checkLines),
            tap((checkLine: CheckLine) => checkLine.gameId = gameId),
            tap((checkLine: CheckLine) => checkLine.order = checkLineCount),
            tap(() => checkLineCount++),
            mergeMap((checkLine: CheckLine) => this.checkLineService.create(checkLine)),
            toArray()
          )),
          toArray(),
          map(() => gameId)
        )),
        mergeMap((gameId: string) => this.makeLineBuoy([level.arrival.buoy1, level.arrival.buoy2], gameId, checkLineCount)),
        mergeMap((gameId: string) => from(level.obstacles).pipe(
          tap((obstacle: Obstacle) => obstacle.gameId = gameId),
          mergeMap((obstacle: Obstacle) => this.obstacleService.create(obstacle)),
          toArray(),
          map(() => gameId)
        )),
        mergeMap((gameId: string) => from(level.cardTypes).pipe(
          mergeMap((cardType: any) => this.deserializeCard(cardType)),
          tap((card: Card) => card.gameId = gameId),
          toArray(),
          mergeMap((cards: Card[]) => shuffle(cards)),
          mergeMap((card: Card) => this.cardService.create(card)),
          toArray(),
          map(() => gameId)
        ))
      ))
    );
  }

  private makeLineBuoy([buoy1, buoy2]: Buoy[], gameId: string, checkLineCount: number): Observable<string> {
    return from([buoy1, buoy2]).pipe(
      tap((buoy: Buoy) => buoy.gameId = gameId),
      mergeMap((buoy: Buoy) => this.buoyService.create(buoy)),
      toArray(),
      mergeMap(() => this.checkLineService.create(new CheckLine({
        order: checkLineCount,
        pointA: buoy1,
        pointB: buoy2,
        gameId
      }))),
      tap(() => checkLineCount++),
      map(() => gameId)
    );
  }

  private deserializeCard(cardType: any): Card[] {
    const card: Card = this.deserializer.deserialize(Card, cardType);

    const cards: Card[] = [card];
    for (let i = 0; i < cardType.count - 1; i++) {
      cards.push(cloneDeep(card));
    }

    return cards;
  }
}
