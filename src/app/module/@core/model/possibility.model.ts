import {Point} from './point';
import {JsonProperty} from 'ts-serializer-core';

export class Possibility {

  @JsonProperty('index')
  public index: number;

  @JsonProperty({name: 'moves', type: Point})
  public moves: Point[];

  @JsonProperty('rotate')
  public rotate: number;
}
