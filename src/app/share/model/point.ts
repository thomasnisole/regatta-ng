import {JsonProperty} from 'json-typescript-mapper';
export class Point {

  @JsonProperty('x')
  public x: number = void 0;

  @JsonProperty('y')
  public y: number = void 0;
}
