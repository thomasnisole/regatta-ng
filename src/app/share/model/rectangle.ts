import {JsonProperty} from 'json-typescript-mapper';
import {Point} from './point';

export class Rectangle extends Point {

  @JsonProperty('width')
  public width: number = void 0;

  @JsonProperty('height')
  public height: number = void 0;

  public isInAnotherRectangle(rect: Rectangle): boolean {
    const rectX2 = rect.x + rect.width;
    const rectY2 = rect.y + rect.height;

    if (this.x < rect.x || this.x > rectX2) {
      return false;
    }

    if (this.y < rect.y || this.y > rectY2) {
      return false;
    }

    if (rectX2 - this.x < this.width) {
      return false;
    }

    if (rectY2 - this.y < this.height) {
      return false;
    }

    return true;
  }

  public intersectAnotherRectangle(rect: Rectangle): boolean {
    return !(this.x + (this.width - 1) < rect.x
      || rect.x + (rect.width - 1) < this.x
      || this.y + (this.height - 1) < rect.y
      || rect.y + (rect.height - 1) < this.y);
  }
}
