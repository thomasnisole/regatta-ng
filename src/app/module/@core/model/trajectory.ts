import {JsonProperty} from 'ts-serializer-core';
import {Line} from './line.model';

export class Trajectory extends Line {

  @JsonProperty('isValid')
  public isValid: boolean = true;
}
