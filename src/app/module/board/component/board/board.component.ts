import {Component} from '@angular/core';
import {filter, first, map, switchMap} from 'rxjs/operators';
import {Game} from '../../../@core/model/game.model';
import {combineLatest, Observable} from 'rxjs';
import {Player} from '../../../@core/model/player.model';
import {environment} from '../../../../../environments/environment';
import {PlayerService} from '../../../@core/service/player.service';
import {hotShareReplay} from '../../../@system/rx-operator/hot-share-replay.operator';
import {Buoy} from '../../../@core/model/buoy.model';
import {Obstacle} from '../../../@core/model/obstacle.model';
import {Boat} from '../../../@core/model/boat.model';
import {CheckLine} from '../../../@core/model/check-line.model';
import {GameService} from '../../../@core/service/game.service';
import {ActivatedRoute, Params} from '@angular/router';
import {BuoyService} from '../../../@core/service/buoy.service';
import {CheckLineService} from '../../../@core/service/check-line.service';
import {BoardService} from '../../../@core/service/board.service';
import {ObstacleService} from '../../../@core/service/obstacle.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  private players$: Observable<Player[]>;

  private seaElements$: Observable<(Player|Obstacle|Buoy)[]>;

  public game$: Observable<Game>;

  public currentPlayer$: Observable<Player>;

  public checkLines$: Observable<CheckLine[]>;

  public caseWidth: number = environment.board.caseDimensions.width;

  public caseHeight: number = environment.board.caseDimensions.height;

  public constructor(gameService: GameService,
                     playerService: PlayerService,
                     obstacleService: ObstacleService,
                     buoyService: BuoyService,
                     checkLineService: CheckLineService,
                     private boardService: BoardService) {
    this.game$ = gameService.findCurrentGame();

    this.players$ = this.game$.pipe(
      switchMap((game: Game) => playerService.findByGameId(game.id)),
      hotShareReplay(1)
    );

    this.currentPlayer$ = this.game$.pipe(
      switchMap((game: Game) => this.players$.pipe(
        switchMap((players: Player[]) => players),
        filter((player: Player) => player.id === game.currentPlayer)
      )),
      hotShareReplay(1)
    );

    this.checkLines$ = this.currentPlayer$.pipe(
      switchMap((player: Player) => checkLineService.findByPlayer(player)),
      hotShareReplay(1),
    );

    this.seaElements$ = combineLatest(
      this.players$,
      this.game$.pipe(
        switchMap((game: Game) => obstacleService.findByGameId(game.id)),
        first()
      ),
      this.game$.pipe(
        switchMap((game: Game) => buoyService.findByGameId(game.id)),
        first()
      )
    ).pipe(
      map((datas: [Player[], Obstacle[], Buoy[]]) => [...datas[0], ...datas[1], ...datas[2]]),
      hotShareReplay(1)
    );
  }

  public isInDepartureArea(player: Player, game: Game): boolean {
    return this.boardService.validateBoatDeparturePosition(player.boat, game.board.departureArea);
  }

  public isBuoy(obj: Buoy): boolean {
    return obj instanceof Buoy;
  }

  public isObstacle(obj: Obstacle): boolean {
    return obj instanceof Obstacle;
  }

  public isBoat(obj: Boat): boolean {
    return obj instanceof Boat;
  }
}
