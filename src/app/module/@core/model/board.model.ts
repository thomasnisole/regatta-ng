import {JsonProperty} from 'ts-serializer-core';
import {Rectangle} from './rectangle';

export class Board extends Rectangle {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('zoom')
  public zoom: number;

  @JsonProperty('boatOrientation')
  public boatOrientation: number;

  @JsonProperty('boatWidth')
  public boatWidth: number;

  @JsonProperty('boatLength')
  public boatLength: number;

  @JsonProperty({name: 'departureArea', type: Rectangle})
  public departureArea: Rectangle;

  public constructor(values?: Partial<Board>) {
    super();

    Object.assign(this, values);
  }
}
