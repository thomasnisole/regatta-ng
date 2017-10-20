import { Injectable } from '@angular/core';
import {Boat} from '../model/boat';
import {Card} from '../model/card';
import {Game} from '../model/game';
import * as _ from 'underscore/underscore';
import {Line} from '../model/line';
import {CardService} from './card.service';
import {SeaElement} from '../model/sea-element';
import {Buoy} from '../model/buoy';
import {Player} from '../model/player';
import {Rectangle} from '../model/rectangle';
import {Trajectory} from '../model/trajectory';

@Injectable()
export class BoardService {

  public constructor() { }

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
            if (player.boat.boatNumber !== boat.boatNumber) {
              return trajectory.intersectRectangle(player.boat.getCongestion());
            }

            return false;
          }
        );
      }

      return !trajectory.isValid;
    });
  }
}
