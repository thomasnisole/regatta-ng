import {JsonProperty} from 'ts-serializer-core';
import {Point} from './point';
import {CheckLine} from './check-line.model';

export class Buoy extends Point {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('color')
  public color: string;

  @JsonProperty('order')
  public order: number;

  @JsonProperty({name: 'checkLines', excludeToJson: true, type: CheckLine})
  public checkLines: CheckLine[];

  public gameId: string;
}
