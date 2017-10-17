import { Injectable } from '@angular/core';
import {Point} from '../model/point';
import {Boat} from '../model/boat';
import {Orientation} from '../model/orientation.enum';
import {Card} from '../model/card';
import {Player} from '../model/player';
import {CardType} from '../model/card-type.enum';
import {GameFlowService} from './game-flow.service';
import * as _ from 'underscore/underscore';
import {Line} from '../model/line';

@Injectable()
export class CardService {

  public constructor(private gameFlowService: GameFlowService) { }

  public canDisplayPossibilities(player: Player, card: Card): boolean {
    if (card.type === CardType.TRAP) {
      return false;
    }

    if (!this.gameFlowService.canMove(player)) {
      return false;
    }

    const cardsInPreview: Card[] = _.sortBy(_.filter(player.cards, (c: Card) => c.previewPossibilities), 'previewOrder');

    if (card.hasCloudOption()) {
      if (cardsInPreview.length !== 0 &&
        !_.last(cardsInPreview).hasSteeringWheelOption() &&
        _.last(cardsInPreview) !== card) {
        return false;
      }

      if (card.previewPossibilities && card.previewPossibilities.length >= 2) {
        return false;
      }
    } else {
      if (card.previewPossibilities) {
        return false;
      }

      if (cardsInPreview.length !== 0 && !_.last(cardsInPreview).hasSteeringWheelOption()) {
        return false;
      }
    }

    return true;
  }

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

  public findAllPossibillityLines(boat: Boat, card: Card, possibilityIndex: number): Line[] {
    const lines: Line[] = [];
    let beginPoint: Point = {x: _.first(card.xDeparture), y: _.first(card.yDeparture)};

    _.each(card.possibilities[possibilityIndex].moves, (move: any) => {
      const p: Point = new Point();
      if (boat.isInTopOrientation()) {
        p.x = beginPoint.x - move.x;
        p.y = beginPoint.y - move.y;
      } else if (boat.isInBottomOrientation()) {
        p.x = beginPoint.x + move.x;
        p.y = beginPoint.y + move.y;
      } else if (boat.isInLeftOrientation()) {
        p.x = beginPoint.x - move.y;
        p.y = beginPoint.y + move.x;
      } else if (boat.isInRightOrientation()) {
        p.x = beginPoint.x + move.y;
        p.y = beginPoint.y - move.x;
      }

      const l = new Line();
      l.pointA = beginPoint;
      l.pointB = p;
      lines.push(l);
      beginPoint = p;
    });

    const bArriving: Boat = _.clone(boat);
    const arrivingIndex = _.indexOf(card.previewPossibilities, possibilityIndex);
    bArriving.orientation = card.orientationArriving[arrivingIndex];
    const arriving = this.findBoatFromArriving(card, bArriving, arrivingIndex);
    bArriving.x = arriving.x;
    bArriving.y = arriving.y;
    const bRectArriving = bArriving.getCongestion();
    const finalLine = new Line();
    finalLine.pointA = {x: bRectArriving.x, y: bRectArriving.y};
    finalLine.pointB = {x: bRectArriving.x + bRectArriving.width - 1, y: bRectArriving.y + bRectArriving.height - 1};
    lines.push(finalLine);

    console.log(lines);

    return lines;
  }
}
