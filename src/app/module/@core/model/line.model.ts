import {JsonProperty} from 'ts-serializer-core';
import {Point} from './point';
import {Rectangle} from './rectangle';
import {cloneDeep} from 'lodash';
import {Boat} from './boat.model';
import {Orientation} from './orientation.enum';

export class Line {

  @JsonProperty({name: 'pointA', type: Point})
  public pointA: Point;

  @JsonProperty({name: 'pointB', type: Point})
  public pointB: Point;

  public constructor(data?: Partial<Line>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
