import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../share/model/card';
import {Boat} from '../../share/model/boat';
import {Orientation} from '../../share/model/orientation.enum';
import {environment} from '../../../environments/environment';
import {CardService} from '../../share/service/card.service';
import {Point} from '../../share/model/point';

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
  public cards: Card[];

  @Input()
  public boatNumber: number;

  @Input()
  public boatColor: string;

  public constructor(private cardService: CardService) { }

  public ngOnInit(): void {
    console.log(this.cards);
  }

  public getCardX(card: Card, i: number): number {
    if (card.orientationDeparture[i] === Orientation.LEFT) {
      return (card.xDeparture[i] - card.height) * environment.board.caseDimensions.width;
    }

    if (card.orientationDeparture[i] === Orientation.RIGHT) {
      return (card.xDeparture[i] + card.height + 1) * environment.board.caseDimensions.width;
    }

    if (card.orientationDeparture[i] === Orientation.TOP) {
      return (card.xDeparture[i] - Math.floor(card.width / 2)) * environment.board.caseDimensions.width;
    }

    if (card.orientationDeparture[i] === Orientation.BOTTOM) {
      return (card.xDeparture[i] + Math.ceil(card.width / 2)) * environment.board.caseDimensions.width;
    }

    return 0;
  }

  public getCardY(card: Card, i: number): number {
    if (card.orientationDeparture[i] === Orientation.LEFT) {
      return (card.yDeparture[i] + Math.ceil(card.width / 2)) * environment.board.caseDimensions.height;
    }

    if (card.orientationDeparture[i] === Orientation.RIGHT) {
      return (card.yDeparture[i] - Math.ceil(card.width / 2) + 1) * environment.board.caseDimensions.height;
    }

    if (card.orientationDeparture[i] === Orientation.TOP) {
      return (card.yDeparture[i] - card.height) * environment.board.caseDimensions.height;
    }

    if (card.orientationDeparture[i] === Orientation.BOTTOM) {
      return (card.yDeparture[i] + card.height + 1) * environment.board.caseDimensions.height;
    }

    return 0;
  }

  public getCardWidth(card: Card, i: number): number {
    if (card.orientationDeparture[i] === Orientation.TOP || card.orientationDeparture[i] === Orientation.BOTTOM) {
      return card.width * environment.board.caseDimensions.width;
    }

    if (card.orientationDeparture[i] === Orientation.LEFT || card.orientationDeparture[i] === Orientation.RIGHT) {
      return card.width * environment.board.caseDimensions.height;
    }

    return 0;
  }

  public getCardHeight(card: Card, i: number): number {
    if (card.orientationDeparture[i] === Orientation.TOP || card.orientationDeparture[i] === Orientation.BOTTOM) {
      return card.height * environment.board.caseDimensions.height;
    }

    if (card.orientationDeparture[i] === Orientation.LEFT || card.orientationDeparture[i] === Orientation.RIGHT) {
      return card.height * environment.board.caseDimensions.width;
    }

    return 0;
  }

  public getBoat(card: Card, i: number): Boat {
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
