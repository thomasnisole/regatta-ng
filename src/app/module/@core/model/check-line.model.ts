import {Line} from './line.model';
import {JsonProperty} from 'ts-serializer-core';

export class CheckLine extends Line {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('order')
  public order: number;

  @JsonProperty('gameId')
  public gameId: string;

  public playerId: string;

  public constructor(values?: Partial<CheckLine>) {
    super();

    Object.assign(this, values);
  }
}
