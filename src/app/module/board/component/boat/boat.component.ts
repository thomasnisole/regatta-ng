import {Component, Input} from '@angular/core';
import {Boat} from '../../../@core/model/boat.model';
import {environment} from '../../../../../environments/environment';
import {forEach} from 'lodash';

@Component({
  selector: '[appBoat]',
  templateUrl: './boat.component.html'
})
export class BoatComponent {

  @Input()
  public boat: Boat;

  public get boatX(): number {
    if (this.boat.isVertical()) {
      return this.boat.x * environment.board.caseDimensions.width - environment.board.caseDimensions.width * 0.225;
    } else {
      return (this.boat.x - Math.floor(this.boat.height / 2)) * environment.board.caseDimensions.width;
    }
  }

  public get boatY(): number {
    if (this.boat.isVertical()) {
      return (this.boat.y - Math.floor(this.boat.height / 2)) * environment.board.caseDimensions.height;
    } else {
      return this.boat.y * environment.board.caseDimensions.height - 35;
    }
  }

  public get boatWidth(): number {
    if (this.boat.isVertical()) {
      return environment.board.caseDimensions.width * 1.5;
    } else {
      return environment.board.caseDimensions.width * 5;
    }
  }

  public get boatHeight(): number {
    if (this.boat.isVertical()) {
      return environment.board.caseDimensions.width * 5;
    } else {
      return environment.board.caseDimensions.width * 7;
    }
  }

  public get href(): string {
    const boatSvgParams = { 'boat-color': this.boat.color, 'boat-number': this.boat.boatNumber };
    let paramStr = '';
    forEach(boatSvgParams, (value, index) => {
      paramStr += '&' + index + '=' + encodeURIComponent(value);
    });

    return environment.svgServerUrl +
      'boat_' +
      this.boat.orientation + paramStr;
  }
}
