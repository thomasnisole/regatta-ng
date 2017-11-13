import {JsonProperty} from 'json-typescript-mapper';
import {Line} from './line';

export class Trajectory extends Line {

  @JsonProperty('isValid')
  public isValid: boolean = true;
}
