import {Directive, Input, ElementRef, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as _ from 'underscore/underscore';

@Directive({
  selector: '[appBuoy]'
})
export class BuoyDirective implements OnInit {

  @Input()
  public x: number;

  @Input()
  public y: number;

  @Input()
  public svgParams: any;

  public constructor(private elementRef: ElementRef) {

  }

  public ngOnInit(): void {
    if (this.x === null || this.y === null) {
      return;
    }
    this.elementRef.nativeElement.setAttribute(
      'x',
      (this.x * environment.board.caseDimensions.width) - (environment.board.caseDimensions.width * 0.125)
    );
    this.elementRef.nativeElement.setAttribute(
      'y',
      (this.y * environment.board.caseDimensions.height) - (environment.board.caseDimensions.height * 1.32)
    );
    this.elementRef.nativeElement.setAttribute('width', 1.25 * environment.board.caseDimensions.width);
    this.elementRef.nativeElement.setAttribute('height', 2.50 * environment.board.caseDimensions.height);

    let paramStr = '';
    _.each(this.svgParams, (value, index) => {
      paramStr += '&' + index + '=' + encodeURIComponent(value);
    });

    this.elementRef.nativeElement.setAttribute('xlink:href', environment.svgServerUrl + 'buoy' + paramStr);
  }

}
