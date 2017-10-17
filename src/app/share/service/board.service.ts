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

@Injectable()
export class BoardService {

  public constructor(private cardService: CardService) { }

  public checkCardMove(game: Game, card: Card, boat: Boat): boolean {
    const lines: Line[] = this.cardService.findAllPossibillityLines(boat, card, _.last(card.previewPossibilities));

    return !_.some(lines, (line: Line) => {
      let result: boolean = _.some(
        game.board.seaElements,
        (seaElement: SeaElement) => line.intersectRectangle(seaElement)
      );

      if (!result) {
        result = _.some(
          game.board.buoys,
          (buoy: Buoy) => {
            const r = new Rectangle();
            r.x = buoy.x;
            r.y = buoy.y;
            r.width = 0;
            r.height = 0;

            return line.intersectRectangle(r);
          }
        );
      }

      if (!result) {
        result = _.some(
          game.players,
          (player: Player) => {
            if (player.boat.boatNumber !== boat.boatNumber) {
              return line.intersectRectangle(player.boat.getCongestion());
            }

            return false;
          }
        );
      }

      return result;
    });
  }
}
