import {Component, Input, OnInit} from '@angular/core';
import {Boat} from '../../share/model/boat';
import {Orientation} from '../../share/model/orientation.enum';
import {environment} from '../../../environments/environment';
import {CardService} from '../../share/service/card.service';
import {Point} from '../../share/model/point';
import {Trajectory} from '../../share/model/trajectory';
import { AbstractCard } from '../../share/model/abstract-card';

@Component({
  selector: '[appCardPreview]',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  @Input()
  public gridX: number;

  @Input()
  public gridY: number;

  @Input()
  public cards: AbstractCard[];

  @Input()
  public boatNumber: number;

  @Input()
  public boatColor: string;

  public constructor(private cardService: CardService) { }

  public ngOnInit(): void {}

  public getXTrajectory(trajectory: Trajectory): number {
    return Math.min(trajectory.pointA.x, trajectory.pointB.x) * environment.board.caseDimensions.width;
  }

  public getYTrajectory(trajectory: Trajectory): number {
    return Math.min(trajectory.pointA.y, trajectory.pointB.y) * environment.board.caseDimensions.height;
  }

  public getWidthTrajectory(trajectory: Trajectory): number {
    return (Math.abs(trajectory.pointA.x - trajectory.pointB.x) + 1) * environment.board.caseDimensions.width;
  }

  public getHeightTrajectory(trajectory: Trajectory): number {
    return (Math.abs(trajectory.pointA.y - trajectory.pointB.y) + 1) * environment.board.caseDimensions.height;
  }

  public getColorTrajectory(trajectory: Trajectory): string {
    return trajectory.isValid ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.5)';
  }

  public getCardX(card: AbstractCard, i: number): number {
    if (card.orientationDeparture[i] === Orientation.LEFT) {
      return (card.xDeparture[i] - card.height) * environment.board.caseDimensions.width;
    }

    if (card.orientationDeparture[i] === Orientation.RIGHT) {
      return (card.xDeparture[i] + card.height + 1) * environment.board.caseDimensions.width;
    }

    if (card.orientationDeparture[i] === Orientation.TOP) {
      let x = card.xDeparture[i] - Math.floor(card.width / 2);
      if (card.offsetDeparture) {
        x += - card.offsetDeparture;
      }
      return x * environment.board.caseDimensions.width;
    }

    if (card.orientationDeparture[i] === Orientation.BOTTOM) {
      let x = card.xDeparture[i] + Math.ceil(card.width / 2);
      if (card.offsetDeparture) {
        x += card.offsetDeparture;
      }
      return x * environment.board.caseDimensions.width;
    }

    return 0;
  }

  public getCardY(card: AbstractCard, i: number): number {
    if (card.orientationDeparture[i] === Orientation.LEFT) {
      let y = card.yDeparture[i] + Math.ceil(card.width / 2);
      if (card.offsetDeparture) {
        y += card.offsetDeparture;
      }
      return  y * environment.board.caseDimensions.height;
    }

    if (card.orientationDeparture[i] === Orientation.RIGHT) {
      let y = card.yDeparture[i] - Math.ceil(card.width / 2) + 1;
      if (card.offsetDeparture) {
        y += - card.offsetDeparture;
      }
      return y * environment.board.caseDimensions.height;
    }

    if (card.orientationDeparture[i] === Orientation.TOP) {
      return (card.yDeparture[i] - card.height) * environment.board.caseDimensions.height;
    }

    if (card.orientationDeparture[i] === Orientation.BOTTOM) {
      return (card.yDeparture[i] + card.height + 1) * environment.board.caseDimensions.height;
    }

    return 0;
  }

  public getCardWidth(card: AbstractCard, i: number): number {
    if (card.orientationDeparture[i] === Orientation.TOP || card.orientationDeparture[i] === Orientation.BOTTOM) {
      return card.width * environment.board.caseDimensions.width;
    }

    if (card.orientationDeparture[i] === Orientation.LEFT || card.orientationDeparture[i] === Orientation.RIGHT) {
      return card.width * environment.board.caseDimensions.height;
    }

    return 0;
  }

  public getCardHeight(card: AbstractCard, i: number): number {
    if (card.orientationDeparture[i] === Orientation.TOP || card.orientationDeparture[i] === Orientation.BOTTOM) {
      return card.height * environment.board.caseDimensions.height;
    }

    if (card.orientationDeparture[i] === Orientation.LEFT || card.orientationDeparture[i] === Orientation.RIGHT) {
      return card.height * environment.board.caseDimensions.width;
    }

    return 0;
  }

  public getBoat(card: AbstractCard, i: number): Boat {
    const boat: Boat = new Boat();
    boat.orientation = card.orientationArriving[i];
    boat.color = this.boatColor;
    boat.boatNumber = this.boatNumber;
    boat.height = 5;
    boat.width = 1;

    const p: Point = this.cardService.findBoatFromArriving(card, boat, i);
    boat.x = p.x;
    boat.y = p.y;

    return boat;
  }
}
