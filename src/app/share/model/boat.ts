import {Rectangle} from './rectangle';
import {JsonProperty} from 'json-typescript-mapper';
import {Orientation} from './orientation.enum';
import {enumConverter} from '../converter/enum-converter';

export class Boat extends Rectangle {

  @JsonProperty('color')
  public color: string = void 0;

  @JsonProperty('boatNumber')
  public boatNumber: number = void 0;

  @JsonProperty({name: 'orientation', customConverter: enumConverter})
  public orientation: Orientation = void 0;

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

  public getCongestion(): Rectangle {
    const rect = new Rectangle();

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
