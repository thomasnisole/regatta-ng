import {JsonProperty} from 'ts-serializer-core';

export class Point {

  @JsonProperty('x')
  public x: number;

  @JsonProperty('y')
  public y: number;

  public constructor(values?: Partial<Point>) {
    Object.assign(this, values);
  }
}
