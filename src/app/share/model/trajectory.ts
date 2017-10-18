import {Line} from './line';
import {JsonProperty} from 'json-typescript-mapper';

export class Trajectory extends Line {

  @JsonProperty('isValid')
  public isValid: boolean = true;
}
