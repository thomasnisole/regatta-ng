import {JsonProperty} from 'ts-serializer-core';
import {Rectangle} from './rectangle';
import {Orientation} from './orientation.enum';
import {Point} from './point';
import {Line} from './line.model';

export class Boat extends Rectangle {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('color')
  public color: string;

  @JsonProperty('boatNumber')
  public boatNumber: number;

  @JsonProperty('orientation')
  public orientation: Orientation;

  public isInTopOrientation(): boolean {
    return this.orientation === Orientation.TOP;
  }

  public isInLeftOrientation(): boolean {
    return this.orientation === Orientation.LEFT;
  }

  public isInRightOrientation(): boolean {
    return this.orientation === Orientation.RIGHT;
  }

  public isInBottomOrientation(): boolean {
    return this.orientation === Orientation.BOTTOM;
  }

  public isVertical(): boolean {
    return this.isInTopOrientation() || this.isInBottomOrientation();
  }

  public isHorizontal(): boolean {
    return this.isInLeftOrientation() || this.isInRightOrientation();
  }

  public getRectangle(): Rectangle {
    const rect: Rectangle = new Rectangle();

    switch (this.orientation) {
      case Orientation.LEFT:
      case Orientation.RIGHT:
        rect.x = this.x - ((this.height - 1) / 2);
        rect.y = this.y;
        rect.width = this.height;
        rect.height = this.width;
        break;

      case Orientation.TOP:
      case Orientation.BOTTOM:
        rect.x = this.x;
        rect.y = this.y - ((this.height - 1) / 2);
        rect.width = this.width;
        rect.height = this.height;

        break;
    }

    return rect;
  }
}
