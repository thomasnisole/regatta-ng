import {JsonProperty} from 'json-typescript-mapper';
import {OptionCard} from './option-card.enum';
import {CardType} from './card-type.enum';
import {enumConverter} from '../converter/enum-converter';
import * as _ from 'underscore/underscore';
import {noUndefined} from '@angular/compiler/src/util';
import {Orientation} from './orientation.enum';
import {Line} from './line';
import {Trajectory} from './trajectory';
import {Player} from './player';

export class Card {

  @JsonProperty('name')
  public name: string = void 0;

  @JsonProperty('svgParams')
  public svgParams: any[] = void 0;

  @JsonProperty({name: 'type', customConverter: enumConverter})
  public type: CardType = void 0;

  @JsonProperty({name: 'options', customConverter: enumConverter})
  public options: OptionCard[] = void 0;

  @JsonProperty('possibilities')
  public possibilities: any[] = void 0;

  @JsonProperty('width')
  public width: number = void 0;

  @JsonProperty('height')
  public height: number = void 0;

  @JsonProperty('previewOrder')
  public previewOrder: number = void 0;

  @JsonProperty('previewPossibilities')
  public previewPossibilities: number[] = void 0;

  @JsonProperty('xDeparture')
  public xDeparture: number[] = void 0;

  @JsonProperty('yDeparture')
  public yDeparture: number[] = void 0;

  @JsonProperty('orientationDeparture')
  public orientationDeparture: Orientation[] = void 0;

  @JsonProperty('xArriving')
  public xArriving: number[] = void 0;

  @JsonProperty('yArriving')
  public yArriving: number[] = void 0;

  @JsonProperty('orientationArriving')
  public orientationArriving: Orientation[] = void 0;

  @JsonProperty('offsetDeparture')
  public offsetDeparture: number = void 0;

  @JsonProperty({name: 'previewTrajectories', clazz: Trajectory})
  public previewTrajectories: Trajectory[] = void 0;

  @JsonProperty('playerTrap')
  public playerTrap: string = void 0;

  public selectedToDrop: boolean = void 0;

  public hasOption(option: OptionCard): boolean {
    if (!this.options) {
      return false;
    }

    if (this.options.length === 0) {
      return false;
    }

    return !_.isUndefined(_.find(this.options, (o: OptionCard) => o === option));
  }

  public hasCloudOption(): boolean {
    return this.hasOption(OptionCard.CLOUD);
  }

  public hasSteeringWheelOption(): boolean {
    return this.hasOption(OptionCard.STEERING_WHEEL);
  }

  public isTrapCard(): boolean {
    return this.type === CardType.TRAP;
  }

  public isMoveCard(): boolean {
    return this.type === CardType.MOVE;
  }

  public get lastXDeparture(): number {
    if (!this.xDeparture || this.xDeparture.length === 0) {
      return null;
    }

    return this.xDeparture[this.xDeparture.length - 1];
  }

  public get lastYDeparture(): number {
    if (!this.yDeparture || this.yDeparture.length === 0) {
      return null;
    }

    return this.yDeparture[this.yDeparture.length - 1];
  }

  public get lastOrientationDeparture(): Orientation {
    if (!this.orientationDeparture || this.orientationDeparture.length === 0) {
      return null;
    }

    return this.orientationDeparture[this.orientationDeparture.length - 1];
  }

  public get lastXArriving(): number {
    if (!this.xArriving || this.xArriving.length === 0) {
      return null;
    }

    return this.xArriving[this.xArriving.length - 1];
  }

  public get lastYArriving(): number {
    if (!this.yArriving || this.yArriving.length === 0) {
      return null;
    }

    return this.yArriving[this.yArriving.length - 1];
  }

  public get lastOrientationArriving(): Orientation {
    if (!this.orientationArriving || this.orientationArriving.length === 0) {
      return null;
    }

    return this.orientationArriving[this.orientationArriving.length - 1];
  }

  public set lastXDeparture(value: number) {
    if (!this.xDeparture) {
      this.xDeparture = [];
    }

    this.xDeparture.push(value);
  }

  public set lastYDeparture(value: number) {
    if (!this.yDeparture) {
      this.yDeparture = [];
    }

    this.yDeparture.push(value);
  }

  public set lastOrientationDeparture(value: Orientation) {
    if (!this.orientationDeparture) {
      this.orientationDeparture = [];
    }

    this.orientationDeparture.push(value);
  }

  public set lastXArriving(value: number) {
    if (!this.xArriving) {
      this.xArriving = [];
    }

    this.xArriving.push(value);
  }

  public set lastYArriving(value: number) {
    if (!this.yArriving) {
      this.yArriving = [];
    }

    this.yArriving.push(value);
  }

  public set lastOrientationArriving(value: Orientation) {
    if (!this.orientationArriving) {
      this.orientationArriving = [];
    }

    this.orientationArriving.push(value);
  }
}
