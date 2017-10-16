import { Injectable } from '@angular/core';
import {Point} from '../model/point';
import {Boat} from '../model/boat';
import {Orientation} from '../model/orientation.enum';
import {Card} from '../model/card';

@Injectable()
export class CardService {

  public constructor() { }

  public findDepartureFromBoat(boat: Boat): Point {
    const p: Point = new Point();

    if (boat.isVertical()) {
      p.x = boat.x;

      if (boat.isInTopOrientation()) {
        p.y = boat.y - Math.floor(boat.height / 2);
      } else if (boat.isInBottomOrientation()) {
        p.y = boat.y + Math.floor(boat.height / 2);
      }
    } else if (boat.isHorizontal()) {
      p.y = boat.y;

      if (boat.isInLeftOrientation()) {
        p.x = boat.x - Math.floor(boat.height / 2);
      } else if (boat.isInRightOrientation()) {
        p.x = boat.x + Math.floor(boat.height / 2);
      }
    }

    return p;
  }

  public findBoatFromArriving(card: Card, boat: Boat, arrivingIndex: number = null): Point {
    const p: Point = new Point();

    if (arrivingIndex === null) {
      if (card.xArriving) {
        arrivingIndex = card.xArriving.length - 1;
      } else {
        arrivingIndex = 0;
      }
    }

    if (boat.isVertical()) {
      p.x = card.xArriving[arrivingIndex];
      if (card.orientationArriving[arrivingIndex] === Orientation.TOP) {
        p.y = card.yArriving[arrivingIndex] - Math.floor(boat.height / 2);
      }

      if (card.orientationArriving[arrivingIndex] === Orientation.BOTTOM) {
        p.y = card.yArriving[arrivingIndex] + Math.floor(boat.height / 2);
      }
    }

    if (boat.isHorizontal()) {
      p.y = card.yArriving[arrivingIndex];
      if (card.orientationArriving[arrivingIndex] === Orientation.LEFT) {
        p.x = card.xArriving[arrivingIndex] - Math.floor(boat.height / 2);
      }

      if (card.orientationArriving[arrivingIndex] === Orientation.RIGHT) {
        p.x = card.xArriving[arrivingIndex] + Math.floor(boat.height / 2);
      }
    }

    return p;
  }
}
