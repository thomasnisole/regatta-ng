import {JsonProperty} from 'ts-serializer-core';
import {Rectangle} from './rectangle';

export class Obstacle extends Rectangle {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('src')
  public src: string;

  @JsonProperty('coefHeight')
  public coefHeight: number;

  public gameId: string;
}
