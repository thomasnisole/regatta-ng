import {Buoy} from './buoy.model';
import {JsonProperty} from 'ts-serializer-core';
import {MarkedLineConverter} from '../../@system/converter/marked-line.converter';
import {Rectangle} from './rectangle';
import {Obstacle} from './obstacle.model';
import {OptionCard} from './option-card.enum';
import {CardType} from './card-type.enum';

export class Level {

  @JsonProperty({name: 'arrival', customConverter: MarkedLineConverter})
  public arrival: {
    buoy1: Buoy;
    buoy2: Buoy
  };

  @JsonProperty('boatLength')
  public boatLength: number;

  @JsonProperty('boatOrientation')
  public boatOrientation: number;

  @JsonProperty('boatWidth')
  public boatWidth: number;

  @JsonProperty({name: 'buoys', type: Buoy})
  public buoys: Buoy[];

  @JsonProperty({name: 'departure', customConverter: MarkedLineConverter})
  public departure: {
    buoy1: Buoy;
    buoy2: Buoy
  };

  @JsonProperty({name: 'departureArea', type: Rectangle})
  public departureArea: Rectangle;

  @JsonProperty('height')
  public height: number;

  @JsonProperty({name: 'obstacles', type: Obstacle})
  public obstacles: Obstacle[];

  @JsonProperty('width')
  public width: number;

  @JsonProperty('cardTypes')
  public cardTypes: {
    options: OptionCard[],
    type: CardType,
    count: number
  }[];
}
