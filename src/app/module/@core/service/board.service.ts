import {Injectable} from '@angular/core';
import {Boat} from '../model/boat.model';
import {Rectangle} from '../model/rectangle';
import {GeometryService} from '../../@system/service/geometry.service';
import {from, iif, Observable, of} from 'rxjs';
import {defaultIfEmpty, filter, first, map, switchMap} from 'rxjs/operators';
import {Obstacle} from '../model/obstacle.model';
import {Game} from '../model/game.model';
import {Buoy} from '../model/buoy.model';
import {BuoyService} from './buoy.service';
import {Player} from '../model/player.model';
import {PlayerStatus} from '../model/player-status.enum';
import {ObstacleService} from './obstacle.service';

@Injectable()
export class BoardService {

  public constructor(private geometryService: GeometryService,
                     private buoyService: BuoyService,
                     private obstacleService: ObstacleService) {}

  public validateBoatDeparturePosition(boat: Boat, departureArea: Rectangle): boolean {
    return this.geometryService.rectangleIsInAnotherOne(boat.getRectangle(), departureArea);
  }

  public validateBoatPosition(game: Game, boat: Boat, otherPlayers$: Observable<Player[]>): Observable<boolean> {
    const rectangle: Rectangle = boat.getRectangle();

    const checkingBuoys$: Observable<boolean> = this.buoyService.findByGameId(game.id).pipe(
      switchMap((buoys: Buoy[]) => from(buoys).pipe(
        map((buoy: Buoy) => !this.geometryService.rectangleIntersectsRectangle(rectangle, buoy)),
        filter((intersect: boolean) => !intersect),
        defaultIfEmpty(true),
        first(),
      ))
    );

    const checkingPlayers$: Observable<boolean> = otherPlayers$.pipe(
      switchMap((players: Player[]) => from(players).pipe(
        filter((player: Player) => player.status === PlayerStatus.WAITING_TO_PLAY),
        map((player: Player) => !this.geometryService.rectangleIntersectsRectangle(rectangle, player.boat.getRectangle())),
        filter((intersect: boolean) => !intersect),
        defaultIfEmpty(true),
        first(),
      ))
    );

    const checkingObstacles$: Observable<boolean> = this.obstacleService.findByGameId(game.id).pipe(
      switchMap((obstacles: Obstacle[]) => from(obstacles).pipe(
        map((obstacle: Obstacle) => !this.geometryService.rectangleIntersectsRectangle(rectangle, obstacle)),
        filter((intersect: boolean) => !intersect),
        defaultIfEmpty(true),
        first(),
      ))
    );

    return checkingBuoys$.pipe(
      switchMap((checkingBuoys: boolean) => iif(
        () => !checkingBuoys,
        of(false),
        checkingPlayers$.pipe(
          switchMap((checkingPlayers: boolean) => iif(
            () => !checkingPlayers,
            of(false),
            checkingObstacles$
          ))
        )
      ))
    );
  }
}
