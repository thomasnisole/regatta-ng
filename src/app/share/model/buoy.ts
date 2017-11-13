import {JsonProperty} from 'json-typescript-mapper';
import {Point} from './point';

export class Buoy extends Point {

  @JsonProperty('color')
  public color: string = void 0;

  @JsonProperty('order')
  public order: number = void 0;
}
