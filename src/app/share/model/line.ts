import {Point} from './point';
import {JsonProperty} from 'json-typescript-mapper';
import {Rectangle} from './rectangle';

export class Line {

  @JsonProperty('pointA')
  public pointA: Point = void 0;

  @JsonProperty('pointB')
  public pointB: Point = void 0;

  public intersectRectangle(rect: Rectangle): boolean {
    if (this.pointA.x === this.pointB.x
      && this.pointA.x >= rect.x && this.pointA.x < rect.x + rect.width) {
      if (Math.min(this.pointA.y, this.pointB.y) < rect.y
        && Math.max(this.pointA.y, this.pointB.y) < rect.y) {
        return false;
      }

      if (Math.min(this.pointA.y, this.pointB.y) > rect.y + rect.height
        && Math.max(this.pointA.y, this.pointB.y) < rect.y + rect.height) {
        return false;
      }

      return true;
    }


    if (this.pointA.y === this.pointB.y
      && this.pointA.y >= rect.y && this.pointA.y < rect.y + rect.height) {
      if (Math.min(this.pointA.x, this.pointB.x) < rect.x
        && Math.max(this.pointA.x, this.pointB.x) < rect.x) {
        return false;
      }

      if (Math.min(this.pointA.x, this.pointB.x) > rect.x + rect.width
        && Math.max(this.pointA.x, this.pointB.x) < rect.x + rect.width) {
        return false;
      }

      return true;
    }

    return false;
  }
}
