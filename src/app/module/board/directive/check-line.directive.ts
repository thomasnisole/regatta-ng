import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Line} from '../../@core/model/line.model';
import {environment} from '../../../../environments/environment';

@Directive({
  selector: '[appCheckLine]'
})
export class CheckLineDirective implements OnInit {

  @Input()
  public checkLine: Line;

  public constructor(private elementRef: ElementRef) {}

  public ngOnInit(): void {
    if (this.checkLine === null) {
      return;
    }

    this.elementRef.nativeElement.setAttribute(
      'x1',
      this.checkLine.pointA.x * environment.board.caseDimensions.width + environment.board.caseDimensions.width / 2
    );
    this.elementRef.nativeElement.setAttribute(
      'y1',
      this.checkLine.pointA.y * environment.board.caseDimensions.height + environment.board.caseDimensions.height / 2
    );

    this.elementRef.nativeElement.setAttribute(
      'x2',
      this.checkLine.pointB.x * environment.board.caseDimensions.width + environment.board.caseDimensions.width / 2
    );
    this.elementRef.nativeElement.setAttribute(
      'y2',
      this.checkLine.pointB.y * environment.board.caseDimensions.height + environment.board.caseDimensions.height / 2
    );

  }
}
