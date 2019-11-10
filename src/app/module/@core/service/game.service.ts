import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';
import {forkJoin, from, Observable, throwError} from 'rxjs';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {filter, first, map, switchMap, tap, toArray} from 'rxjs/operators';
import {GameStatus} from '../model/game-status.enum';
import {User} from '../model/user.model';
import {LevelRepository} from '../repository/level.repository';
import {Level} from '../model/level.model';
import {Buoy} from '../model/buoy.model';
import {Board} from '../model/board.model';
import {environment} from '../../../../environments/environment';
import {Obstacle} from '../model/obstacle.model';
import {CheckLine} from '../model/check-line.model';
import {Card} from '../model/card.model';
import {cloneDeep, shuffle} from 'lodash';
import {GameRepository} from '../repository/game.repository';
import {Select} from '@ngxs/store';
import {CurrentGameIdState} from '../state/current-game-id/current-game-id.state';
import {hotShareReplay} from '../../@system/rx-operator/hot-share-replay.operator';
import {Memoize} from '../../@system/decorator/memoize.decorator';
import {CardRepository} from '../repository/card.repository';
import {CheckLineRepository} from '../repository/check-line.repository';
import {ObstacleRepository} from '../repository/obstacle.repository';
import {BuoyRepository} from '../repository/buoy.repository';

@Injectable()
export class GameService {

  @Select(CurrentGameIdState)
  private currentGameId$: Observable<string>;

  public constructor(private gameRepository: GameRepository,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService,
                     private levelRepository: LevelRepository,
                     private buoyRepository: BuoyRepository,
                     private obstacleRepository: ObstacleRepository,
                     private checkLineRepository: CheckLineRepository,
                     private cardRepository: CardRepository) {}

  @Memoize()
  public findCurrentGame(): Observable<Game> {
    return this.currentGameId$.pipe(
      switchMap((gameId: string) => this.gameRepository.findById(gameId)),
      hotShareReplay(1)
    );
  }

  public findAllWaiting(user: User): Observable<Game[]> {
    return this.gameRepository.findByStatus(GameStatus.WAITING).pipe(
      switchMap((games: Game[]) => from(games).pipe(
        filter((game: Game) => game.userUids.indexOf(user.uid) === -1),
        toArray()
      ))
    );
  }

  public findAllResuming(user: User): Observable<Game[]> {
    return this.gameRepository.findByUserUidIn(user);
  }

  public moveBoard(deltaX: number, deltaY: number, deltaZoom: number): Observable<void> {
    return this.findCurrentGame().pipe(
      tap((game: Game) => game.board.x += deltaX),
      tap((game: Game) => game.board.y += deltaY),
      tap((game: Game) => game.board.zoom += deltaZoom),
      switchMap((game: Game) => this.gameRepository.update(game))
    );
  }

  public resetBoardOnPosition(x: number, y: number, zoom: number): Observable<void> {
    return this.findCurrentGame().pipe(
      tap((game: Game) => game.board.x = x),
      tap((game: Game) => game.board.y = y),
      tap((game: Game) => game.board.zoom = zoom),
      switchMap((game: Game) => this.gameRepository.update(game))
    );
  }

  public start(game: Game): Observable<void> {
    if (game.userUids.length <= 0) {
      return throwError(new Error('Not enough player in game'));
    }

    game.status = GameStatus.STARTED;
    return this.gameRepository.update(game);
  }

  public newGame(game: Game): Observable<string> {
    game.status = GameStatus.WAITING;

    let checkLineCount: number = 0;

    return this.levelRepository.findById('hqD1b6eS8B0gvLwRB6i1').pipe(
      first(),
      tap((level: Level) => game.board = new Board({
        x: 0,
        y: 0,
        width: 0,
        height: environment.board.viewboxHeight,
        zoom: environment.board.viewboxHeight,
        departureArea: level.departureArea,
        boatOrientation: level.boatOrientation,
        boatLength: level.boatLength,
        boatWidth: level.boatWidth
      })),
      switchMap((level: Level) => this.gameRepository.create(game).pipe(
        switchMap((gameId: string) => this.makeLineBuoy([level.departure.buoy1, level.departure.buoy2], gameId, checkLineCount)),
        switchMap((gameId: string) => from(level.buoys.sort((a: Buoy, b: Buoy) => a.order - b.order)).pipe(
          tap((buoy: Buoy) => buoy.gameId = gameId),
          map((buoy: Buoy) => this.buoyRepository.create(buoy).pipe(
            switchMap(() => buoy.checkLines),
            tap((checkLine: CheckLine) => checkLine.gameId = gameId),
            tap((checkLine: CheckLine) => checkLine.order = checkLineCount),
            tap(() => checkLineCount++),
            map((checkLine: CheckLine) => this.checkLineRepository.createInGame(checkLine)),
            toArray(),
            switchMap((obs$: Observable<string>[]) => forkJoin(obs$))
          )),
          toArray(),
          switchMap((obs$: Observable<string[]>[]) => forkJoin(obs$)),
          map(() => gameId)
        )),
        switchMap((gameId: string) => this.makeLineBuoy([level.arrival.buoy1, level.arrival.buoy2], gameId, checkLineCount)),
        switchMap((gameId: string) => from(level.obstacles).pipe(
          tap((obstacle: Obstacle) => obstacle.gameId = gameId),
          switchMap((obstacle: Obstacle) => this.obstacleRepository.create(obstacle)),
          toArray(),
          map(() => gameId)
        )),
        switchMap((gameId: string) => from(level.cardTypes).pipe(
          switchMap((cardType: any) => this.deserializeCard(cardType)),
          tap((card: Card) => card.gameId = gameId),
          toArray(),
          switchMap((cards: Card[]) => shuffle(cards)),
          switchMap((card: Card) => this.cardRepository.create(card)),
          toArray(),
          map(() => gameId)
        ))
      ))
    );
  }

  private makeLineBuoy([buoy1, buoy2]: Buoy[], gameId: string, checkLineCount: number): Observable<string> {
    return from([buoy1, buoy2]).pipe(
      tap((buoy: Buoy) => buoy.gameId = gameId),
      switchMap((buoy: Buoy) => this.buoyRepository.create(buoy)),
      toArray(),
      switchMap(() => this.checkLineRepository.createInGame(new CheckLine({
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
