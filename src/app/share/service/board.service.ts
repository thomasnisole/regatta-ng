import { Injectable } from '@angular/core';
import {Boat} from '../model/boat';
import {Game} from '../model/game';
import * as _ from 'underscore/underscore';
import {Line} from '../model/line';
import {CardService} from './card.service';
import {SeaElement} from '../model/sea-element';
import {Buoy} from '../model/buoy';
import {Player} from '../model/player';
import {Rectangle} from '../model/rectangle';
import {Trajectory} from '../model/trajectory';
import { serialize } from 'json-typescript-mapper';
import { removeUndefined } from '../utils';
import { AngularFireDatabase } from 'angularfire2/database';
import { Board } from '../model/board';
import { environment } from '../../../environments/environment';

@Injectable()
export class BoardService {

  public constructor(private db: AngularFireDatabase) { }

  public checkCardMove(game: Game, trajectories: Trajectory[], boat: Boat): boolean {
    return !_.some(trajectories, (trajectory: Trajectory) => {
      trajectory.isValid = !_.some(
        game.board.seaElements,
        (seaElement: SeaElement) =>  trajectory.intersectRectangle(seaElement)
      );

      if (trajectory.isValid) {
        trajectory.isValid = !_.some(
          game.board.buoys,
          (buoy: Buoy) => {
            const r = new Rectangle();
            r.x = buoy.x;
            r.y = buoy.y;
            r.width = 1;
            r.height = 1;

            return trajectory.intersectRectangle(r);
          }
        );
      }

      if (trajectory.isValid) {
        trajectory.isValid = !_.some(
          game.getPlayersGaming(),
          (player: Player) => {
            if (player.boat.boatNumber !== boat.boatNumber && player.isStarted()) {
              return trajectory.intersectRectangle(player.boat.getCongestion());
            }

            return false;
          }
        );
      }

      return !trajectory.isValid;
    });
  }

  public update(board: Board, game: Game): void {
    this.db.object('/games/' + game.id + '/board').update(removeUndefined(serialize(board)));
  }

  public checkBoatPosition(game: Game, boat: Boat): boolean {
    let isValid: boolean = !_.some(
      game.board.seaElements,
      (seaElement: SeaElement) =>  boat.getCongestion().intersectAnotherRectangle(seaElement)
    );

    if (isValid) {
      isValid = !_.some(
        game.board.buoys,
        (buoy: Buoy) => {
          const r = new Rectangle();
          r.x = buoy.x;
          r.y = buoy.y;
          r.width = 1;
          r.height = 1;

          return boat.getCongestion().intersectAnotherRectangle(r);
        }
      );
    }

    if (isValid) {
      isValid = !_.some(
        game.getPlayersGaming(),
        (p: Player) => {
          if (p.boat.boatNumber !== boat.boatNumber && p.isStarted()) {
            return boat.getCongestion().intersectAnotherRectangle(boat.getCongestion());
          }

          return false;
        }
      );
    }

    return isValid;
  }

  public moveMap(board: Board, deltaX: number, deltaY: number): void {
    board.x += deltaX;
    board.y += deltaY;
  }

  public zoomMap(board: Board, deltaZoom: number): void {
    board.zoom += deltaZoom;
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
}
