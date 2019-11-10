import {Injectable} from '@angular/core';
import {Rectangle} from '../../@core/model/rectangle';
import * as geometric from 'geometric';
import {Line} from '../../@core/model/line.model';
import {Point} from '../../@core/model/point';

@Injectable()
export class GeometryService {

  public constructor() { }

  public rectangleIntersectsRectangle(rectangleA: Rectangle, rectangleB: Rectangle): boolean {
    return rectangleA.x <= (rectangleB.x + rectangleB.width - 1) && (rectangleA.x + rectangleA.width - 1) >= rectangleB.x &&
      rectangleA.y <= (rectangleB.y + rectangleB.height - 1) && (rectangleA.y + rectangleA.height - 1) >= rectangleB.y;
  }

  public rectangleIsInAnotherOne(rectangle: Rectangle, other: Rectangle): boolean {
    const rectX2: number = other.x + other.width;
    const rectY2: number = other.y + other.height;

    if (rectangle.x < other.x || rectangle.x > rectX2) {
      return false;
    }

    if (rectangle.y < other.y || rectangle.y > rectY2) {
      return false;
    }

    if (rectX2 - rectangle.x < rectangle.width) {
      return false;
    }

    if (rectY2 - rectangle.y < rectangle.height) {
      return false;
    }

    return true;
  }
}
