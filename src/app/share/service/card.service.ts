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
import {Trajectory} from '../model/trajectory';

@Injectable()
export class CardService {

  public constructor(private gameFlowService: GameFlowService) { }

  public canDisplayPossibilities(player: Player, card: Card): boolean {
    if (!card.isMoveCard()) {
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

      if (cardsInPreview.length === 2) {
        return false;
      }
    } else {
      if (card.previewPossibilities) {
        return false;
      }

      if (cardsInPreview.length === 1 && !_.last(cardsInPreview).hasSteeringWheelOption()) {
        return false;
      }

      if (cardsInPreview.length === 2) {
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

  public findAllPossibillityTrajectories(boat: Boat, card: Card, previewPossibilityIndex: number): Trajectory[] {
    const trajectories: Trajectory[] = [];
    const possibilityIndex = card.previewPossibilities[previewPossibilityIndex];
    let beginPoint: Point = {
      x: card.xDeparture[previewPossibilityIndex],
      y: card.yDeparture[previewPossibilityIndex]
    };
    const savedOrientation = boat.orientation;
    boat.orientation = card.orientationDeparture[previewPossibilityIndex];

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

      const t = new Trajectory();
      t.pointA = beginPoint;
      t.pointB = p;
      trajectories.push(t);
      beginPoint = p;
    });
    boat.orientation = savedOrientation;

    const bArriving: Boat = _.clone(boat);
    bArriving.orientation = card.orientationArriving[previewPossibilityIndex];
    const arriving = this.findBoatFromArriving(card, bArriving, previewPossibilityIndex);
    bArriving.x = arriving.x;
    bArriving.y = arriving.y;
    const bRectArriving = bArriving.getCongestion();
    const finalTrajectory = new Trajectory();
    finalTrajectory.pointA = {x: bRectArriving.x, y: bRectArriving.y};
    finalTrajectory.pointB = {x: bRectArriving.x + bRectArriving.width - 1, y: bRectArriving.y + bRectArriving.height - 1};
    trajectories.push(finalTrajectory);

    return trajectories;
  }

  public clearMoveCard(card: Card): void {
    card.previewPossibilities = void 0;
    card.previewTrajectories = void 0;
    card.previewOrder = void 0;
    card.xDeparture = void 0;
    card.yDeparture = void 0;
    card.xArriving = void 0;
    card.yArriving = void 0;
    card.orientationDeparture = void 0;
    card.orientationArriving = void 0;
  }

  public clearTrapCard(card: Card): void {
    card.playerTrap = void 0;
  }
}
