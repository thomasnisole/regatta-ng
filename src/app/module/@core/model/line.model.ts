import {JsonProperty} from 'ts-serializer-core';
import {Point} from './point';
import {Rectangle} from './rectangle';
import {cloneDeep} from 'lodash';

export class Line {

  @JsonProperty({name: 'pointA', type: Point})
  public pointA: Point;

  @JsonProperty({name: 'pointB', type: Point})
  public pointB: Point;

  public intersectRectangle(rect: Rectangle): boolean {
    const r = cloneDeep(rect);
    r.width -= 1;
    r.height -= 1;

    if (this.pointA.x === this.pointB.x
      && this.pointA.x >= r.x && this.pointA.x <= r.x + r.width) {
      if (Math.min(this.pointA.y, this.pointB.y) < r.y
        && Math.max(this.pointA.y, this.pointB.y) < r.y) {
        return false;
      }

      if (Math.min(this.pointA.y, this.pointB.y) > r.y + r.height
        && Math.max(this.pointA.y, this.pointB.y) > r.y + r.height) {
        return false;
      }

      return true;
    }

    if (this.pointA.y === this.pointB.y
      && this.pointA.y >= r.y && this.pointA.y <= r.y + r.height) {
      if (Math.min(this.pointA.x, this.pointB.x) < r.x
        && Math.max(this.pointA.x, this.pointB.x) < r.x) {
        return false;
      }

      if (Math.min(this.pointA.x, this.pointB.x) > r.x + r.width
        && Math.max(this.pointA.x, this.pointB.x) > r.x + r.width) {
        return false;
      }

      return true;
    }

    return false;
  }

  public intersectLine(line: Line): boolean {
    const rect = new Rectangle();
    rect.x = Math.min(line.pointA.x, line.pointB.x);
    rect.y = Math.min(line.pointA.y, line.pointB.y);
    rect.width = Math.abs(line.pointA.x - line.pointB.x) + 1;
    rect.height = Math.abs(line.pointA.y - line.pointB.y) + 1;

    return this.intersectRectangle(rect);
  }
}
