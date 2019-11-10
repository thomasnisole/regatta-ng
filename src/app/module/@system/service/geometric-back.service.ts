import {Injectable} from '@angular/core';
import {Rectangle} from '../../@core/model/rectangle';
import * as geometric from 'geometric';
import {Line} from '../../@core/model/line.model';
import {Point} from '../../@core/model/point';

@Injectable()
export class GeometricBackService {

  public constructor() { }

  private makePolygonFromRectangle(rect: Rectangle): number[][] {
    return [
      [rect.x, rect.y],
      [rect.x + rect.width - 1, rect.y],
      [rect.x + rect.width - 1, rect.y + rect.height - 1],
      [rect.x, rect.y + rect.height - 1]
    ];
  }

  private makeLineFromLine(line: Line): number[][] {
    return [
      [line.pointA.x, line.pointA.y],
      [line.pointB.x, line.pointB.y]
    ];
  }

  private makePointFromPoint(point: Point): number[] {
    return [point.x, point.y];
  }

  public pointOnLine(point: Point, line: Line): boolean {
    return geometric.pointOnLine(this.makePointFromPoint(point), this.makeLineFromLine(line));
  }

  public lineInRectangle(line: Line, rectangle: Rectangle): boolean {
    const pointA: number[] = this.makePointFromPoint(line.pointA);
    const pointB: number[] = this.makePointFromPoint(line.pointB);
    const polygon: number[][] = this.makePolygonFromRectangle(rectangle);
    return (geometric.pointInPolygon(pointA, polygon) || geometric.pointOnPolygon(pointA, polygon))
      && (geometric.pointInPolygon(pointB, polygon) || geometric.pointOnPolygon(pointB, polygon));
  }

  public lineIntersectsLine(lineA: Line, lineB: Line): boolean {
    return geometric.lineIntersectsLine(this.makeLineFromLine(lineA), this.makeLineFromLine(lineB));
  }

  public lineIntersectsRectangle(line: Line, rectangle: Rectangle): boolean {
    return geometric.lineIntersectsPolygon(this.makeLineFromLine(line), this.makePolygonFromRectangle(rectangle));
  }
}
