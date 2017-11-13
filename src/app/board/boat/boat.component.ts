import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'underscore/underscore';
import {environment} from '../../../environments/environment';
import {Boat} from '../../share/model/boat';

@Component({
  selector: '[appBoat]',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {

  @Input()
  public boat: Boat;

  public constructor() { }

  public ngOnInit(): void {

  }

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
    _.each(boatSvgParams, (value, index) => {
      paramStr += '&' + index + '=' + encodeURIComponent(value);
    });

    return environment.svgServerUrl +
      'boat_' +
      this.boat.orientation + paramStr;
  }
}
