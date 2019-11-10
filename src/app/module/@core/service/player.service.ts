import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';
import {combineLatest, forkJoin, from, iif, Observable, of} from 'rxjs';
import {Player} from '../model/player.model';
import {Boat} from '../model/boat.model';
import {filter, first, map, switchMap, tap, toArray} from 'rxjs/operators';
import {User} from '../model/user.model';
import {PlayerStatus} from '../model/player-status.enum';
import {CardService} from './card.service';
import {PlayerRepository} from '../repository/player.repository';
import {CheckLine} from '../model/check-line.model';
import {Select} from '@ngxs/store';
import {CurrentGameIdState} from '../state/current-game-id/current-game-id.state';
import {hotShareReplay} from '../../@system/rx-operator/hot-share-replay.operator';
import {Orientation} from '../model/orientation.enum';
import {CurrentUserUidState} from '../../player/state/current-user-uid/current-user-uid.state';
import {Memoize} from '../../@system/decorator/memoize.decorator';
import {GameRepository} from '../repository/game.repository';
import {GameService} from './game.service';
import {BoardService} from './board.service';
import {CheckLineRepository} from '../repository/check-line.repository';

@Injectable()
export class PlayerService {

  @Select(CurrentGameIdState)
  private currentGameId$: Observable<string>;

  @Select(CurrentUserUidState)
  private currentUserUid$: Observable<string>;

  public constructor(private playerRepository: PlayerRepository,
                     private gameRepository: GameRepository,
                     private cardService: CardService,
                     private checkLineRepository: CheckLineRepository,
                     private gameService: GameService,
                     private boardService: BoardService) { }

  @Memoize()
  public findCurrentPayer(): Observable<Player> {
    return combineLatest(
      this.currentGameId$.pipe(
        filter((gameId: string) => !!gameId)
      ),
      this.currentUserUid$
    ).pipe(
      switchMap(([gameId, userUid]: [string, string]) => this.findByGameIdAndUserUid(gameId, userUid)),
      hotShareReplay(1)
    );
  }

  @Memoize()
  public findByGameId(gameId: string): Observable<Player[]> {
    return this.playerRepository.findByGameId(gameId).pipe(
      hotShareReplay(1)
    );
  }

  public findByGameIdAndUserUid(gameId: string, userUid: string): Observable<Player> {
    return this.playerRepository.findByGameIdAndUserUid(gameId, userUid);
  }

  public addPlayerToGame(game: Game, user: User, color, boatNumber): Observable<void> {
    const boat: Boat = new Boat();
    boat.boatNumber = boatNumber;
    boat.color = color;
    boat.orientation = game.board.boatOrientation;
    boat.x = game.board.departureArea.x;
    boat.y = game.board.departureArea.y;
    boat.width = game.board.boatWidth;
    boat.height = game.board.boatLength;

    const player: Player = new Player();
    player.id = user.uid;
    player.name = user.displayName;
    player.userUid = user.uid;
    player.gameId = game.id;
    player.status = PlayerStatus.WAITING_TO_START;
    player.boat = boat;

    game.userUids.push(user.uid);
    if (!game.currentPlayer) {
      game.currentPlayer = user.uid;
    }

    return this.playerRepository.create(player).pipe(
      tap((playerId: string) => player.id = playerId),
      switchMap(() => this.gameRepository.update(game)),
      switchMap(() => this.cardService.takeCards(5, player)),
      switchMap(() => this.checkLineRepository.findByGame(game).pipe(
        first()
      )),
      switchMap((checkLines: CheckLine[]) => from(checkLines).pipe(
        tap((checkLine: CheckLine) => checkLine.playerId = player.id),
        map((checkLine: CheckLine) => this.checkLineRepository.createInPlayer(checkLine)),
        toArray()
      )),
      switchMap((obs$: Observable<string>[]) => forkJoin(obs$)),
      first(),
      map(() => void 0)
    );
  }

  public moveBoat(deltaX: number, deltaY: number, deltaOrientation: number): Observable<void> {
    return this.findCurrentPayer().pipe(
      first(),
      tap((player: Player) => player.boat.x += deltaX),
      tap((player: Player) => player.boat.y += deltaY),
      tap((player: Player) => {
        player.boat.orientation += deltaOrientation;
        if (player.boat.orientation > Orientation.LEFT) {
          player.boat.orientation = Orientation.TOP;
        }
        if (player.boat.orientation < Orientation.TOP) {
          player.boat.orientation = Orientation.LEFT;
        }
      }),
      switchMap((player: Player) => this.playerRepository.update(player))
    );
  }

  public start(player: Player): Observable<boolean> {
    return this.gameService.findCurrentGame().pipe(
      first(),
      switchMap((game: Game) => iif(
        () => this.boardService.validateBoatDeparturePosition(player.boat, game.board.departureArea),
        this.boardService.validateBoatPosition(game, player.boat, this.findByGameId(game.id)).pipe(
          switchMap((validation: boolean) => iif(
            () => validation,
            of(player).pipe(
              tap((p: Player) => p.status = PlayerStatus.WAITING_TO_PLAY),
              switchMap((p) => this.playerRepository.update(p)),
              map(() => true)
            ),
            of(false)
          ))
        ),
        of(false)
      )),
      first()
    );
  }

  public deletePlayerFromGame(player: Player): Observable<void> {
    return null;
  }
}
