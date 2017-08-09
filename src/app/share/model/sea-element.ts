import {Rectangle} from './rectangle';
import {JsonProperty} from 'json-typescript-mapper';

export class SeaElement extends Rectangle {
  @JsonProperty('src')
  public src: string = void 0;

  @JsonProperty('heightCoefficient')
  public heightCoefficient: number = void 0;
}
