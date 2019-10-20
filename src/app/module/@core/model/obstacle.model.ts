import {JsonProperty} from 'ts-serializer-core';
import {Rectangle} from './rectangle';

export class Obstacle extends Rectangle {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('src')
  public src: string;

  @JsonProperty('heightCoefficient')
  public heightCoefficient: number;

  public gameId: string;
}
