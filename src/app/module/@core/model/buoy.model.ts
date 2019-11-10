import {JsonProperty} from 'ts-serializer-core';
import {Point} from './point';
import {CheckLine} from './check-line.model';
import {Rectangle} from './rectangle';

export class Buoy extends Rectangle {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('color')
  public color: string;

  @JsonProperty('order')
  public order: number;

  @JsonProperty({name: 'checkLines', excludeToJson: true, type: CheckLine})
  public checkLines: CheckLine[];

  public gameId: string;

  public readonly width: number = 1;

  public readonly height: number = 1;
}
